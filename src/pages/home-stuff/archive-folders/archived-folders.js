import Folder from '../folder-stuff/folder/folder';
import './archived-folders.css';

function ArchivedFolders({
  folders,
  onDeleteFolder,
  onEditFolder,
  onDearchiveFolder,
  onPosUp,
  onPosDown,
  onPosAdjust,
}) {
  return (
    <div className='archived-box'>
      <h1 className='archived-heading'>ARCHIVED FOLDERS</h1> 
      <div className='archived-seperator'/> 
      <>
        {folders // render archived folders
          .filter((folder) => folder.archived)
          .map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              folderCount={folders.length}
              onDeleteFolder={onDeleteFolder}
              onEditFolder={onEditFolder}
              onDearchiveFolder={onDearchiveFolder}
              onPosUp={onPosUp}
              onPosDown={onPosDown}
              onPosAdjust={onPosAdjust}
            />
          ))}
      </>
    </div>
  );
}

export default ArchivedFolders;
