import React from 'react';
import FolderHome from './FolderHome';
import NewFolder from './NewFolder';

const FolderBase = ({ folders }) => {
    const newFolderClick = () => {
        alert('test')
      }

    return (
        <div className='Folder_Base'>
            <>
              {folders.map((folder) => (
                <FolderHome key={folder.id} folder={folder} />
              ))}
            </>
            <NewFolder NewFolderClick={newFolderClick} />
        </div>
    );
}

export default FolderBase;