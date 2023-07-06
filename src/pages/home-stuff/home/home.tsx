import './home.css';
import Layout from '../../../components/layout/layout';
import Folder from '../folder-stuff/folder/folder';
import FolderForm from '../folder-stuff/form-folder/folder-form';
import { useRef, useState } from 'react';
import newFolder from '../../../images/new-folder.svg';
import * as Type from '../../../types';
import { updateFolder } from '../../../technical/utils/mongo';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function HomePage() {
  const ref: { current: any } = useRef();

  const [folders, setFolders] = useState<any>([]); //saves the data of folders in an array

  const updateFolders = (updatedFolders: Type.Folder[]) => {
    setFolders(updatedFolders);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false); //state to check if the modal is open or not

  const addFolder = (title: string) => {
    ref.current.onAddFolder(title);
    setModalIsOpen(false);
  };
  const editFolder = (id: string, title: string) => {
    ref.current.onEditFolder(id, title);
  };
  const changeFolderIcon = (id: string, icon: string) => {
    ref.current.onChangeFolderIcon(id, icon);
  };
  const favoriteFolder = (id: string) => {
    ref.current.onFavoriteFolder(id);
  };
  const unfavoriteFolder = (id: string) => {
    ref.current.onUnfavoriteFolder(id);
  };
  const archiveFolder = (id: string) => {
    ref.current.onArchiveFolder(id);
  };
  const deleteFolder = (folder: Type.Folder) => {
    ref.current.onDeleteFolder(folder);
  };

  const [searchQuery, setSearchQuery] = useState('');

  //Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState(null);

  return (
    <Layout
      ref={ref}
      path='home'
      onUpdateFolders={(updatedFolders) => updateFolders(updatedFolders)}
      onUpdateSearchQuery={(query) => setSearchQuery(query)}
    >
      <main>
        <div className='square'>
          <section>
            <span className='spaced-rep-subtitles'>
              <span style={{ fontFamily: 'var(--font-user-content)' }}>Due</span>
            </span>
            <div className='main-seperator'></div>
          </section>
          <div className='folder-base'>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              sensors={sensors}
            >
              {folders.length > 0 ? (
                <div />
              ) : (
                <div className='no-folder-text'>
                  Currently there are no folders. Please create one...
                </div>
              )}
              <SortableContext items={folders} strategy={verticalListSortingStrategy}>
                {folders
                  .filter((folder: Type.Folder) =>
                    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .filter((folder: Type.Folder) => !folder.archived)
                  .map((folder: Type.Folder) => (
                    <Folder
                      key={folder._id}
                      id={folder._id}
                      folder={folder}
                      folderCount={folders.length}
                      onDeleteFolder={deleteFolder}
                      onEditFolder={editFolder}
                      onArchiveFolder={archiveFolder}
                      onChangeFolderIcon={changeFolderIcon}
                      onFavoriteFolder={favoriteFolder}
                      onUnfavoriteFolder={unfavoriteFolder}
                    />
                  ))}
                <DragOverlay>
                  {activeId ? (
                    <Folder
                      id={activeId}
                      key={activeId}
                      folder={folders.find((folder: Type.Folder) => folder._id === activeId)}
                      folderCount={folders.length}
                      onDeleteFolder={deleteFolder}
                      onEditFolder={editFolder}
                      onArchiveFolder={archiveFolder}
                      onChangeFolderIcon={changeFolderIcon}
                      onFavoriteFolder={favoriteFolder}
                      onUnfavoriteFolder={unfavoriteFolder}
                    />
                  ) : null}
                </DragOverlay>
              </SortableContext>
            </DndContext>

            <div data-folders={folders}>
              <div className='new-folder-line' />
              <button className='new-folder-body' onClick={() => setModalIsOpen(true)}>
                <div className='button-new-folder'>
                  <img src={newFolder} alt='new folder' />
                </div>
                <p className='new-folder-text'>Create new folder</p>
                <div>
                  {modalIsOpen && (
                    <FolderForm
                      type='Create new'
                      folder={{ title: '' }}
                      onConfirm={addFolder}
                      onCancel={() => setModalIsOpen(false)}
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const activeIndex = folders.findIndex((folder: Type.Folder) => folder._id === active.id);
    const overIndex = folders.findIndex((folder: Type.Folder) => folder._id === over.id);

    if (activeIndex !== overIndex) {
      const updatedFolders = [...folders];
      const [removed] = updatedFolders.splice(activeIndex, 1);
      updatedFolders.splice(overIndex, 0, removed);

      const updatedFoldersWithPositions = updatedFolders.map(
        (folder: Type.Folder, index: number) => ({
          ...folder,
          pos: index + 1,
        })
      );
      setFolders(updatedFoldersWithPositions);

      // Update new positions in the database
      updatedFoldersWithPositions.forEach(async (folder) => {
        await updateFolder(folder._id, { pos: folder.pos });
      });
    }
    setActiveId(null);
  }

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
    console.log(active.id);
  }
}

export default HomePage;
