import * as Type from '../../../types';
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
    onChangeFolderIcon
}: {
    folders: any,
    onDeleteFolder: any,
    onEditFolder: any,
    onDearchiveFolder: any,
    onPosUp: any,
    onPosDown: any,
    onPosAdjust: any,
    onChangeFolderIcon: any
}) {

    return (
        <div className='archived-box' style={{ paddingLeft: '20px' }}>
            <>
                <h1 className='archived-heading'>ARCHIVED FOLDERS</h1>
                <div className='archived-seperator' style={{ top: '80px' }} />
                {folders // render archived folders
                    .filter((folder: Type.Folder) => folder.archived)
                    .map((folder: Type.Folder) => (
                        <Folder
                            key={folder._id.toString()}
                            folder={folder}
                            folderCount={folders.length}
                            onDeleteFolder={onDeleteFolder}
                            onEditFolder={onEditFolder}
                            onArchiveFolder={undefined}
                            onDearchiveFolder={onDearchiveFolder}
                            onPosUp={onPosUp}
                            onPosDown={onPosDown}
                            onPosAdjust={onPosAdjust}
                            onChangeFolderIcon={onChangeFolderIcon}
                        />
                    ))}
            </>
        </div>
    );
}

export default ArchivedFolders;
