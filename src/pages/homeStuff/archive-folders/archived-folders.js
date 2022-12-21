import Folder from '../folderStuff/folder/folder';

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
    <div className='preview-type-box' style={{ paddingInline: '20px' }}>
      {/*CSS from changePreview.css */}
      <h1 className='preview-type-heading'>ARCHIVED FOLDERS</h1> {/*CSS from changePreview.css */}
      <div className='main-seperator' style={{ top: '80px' }} /> {/*CSS from home.css */}
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
