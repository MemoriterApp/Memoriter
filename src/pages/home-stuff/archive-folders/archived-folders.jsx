import React from 'react';
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
    console.log('the function is running');
    //console log all of the props
    console.log(folders);   
    console.log(onDeleteFolder);
    console.log(onEditFolder);
    console.log(onDearchiveFolder);
    console.log(onPosUp);
    console.log(onPosDown);
    console.log(onPosAdjust);
    //for some reason the props are null and therefore the app crashes

    return (
        <div className='archived-box' style={{ paddingLeft: '20px' }}>
            
            <h1 className='archived-heading'>ARCHIVED FOLDERS</h1> 
            <div className='archived-seperator' style={{ top: '80px' }} /> 
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
            {console.log('the folders are being rendered')}
        </div>
    );
}

export default ArchivedFolders;

