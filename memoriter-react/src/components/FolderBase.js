import React from 'react';
import { useState } from 'react';
import FolderHome from './FolderHome';
import NewFolder from './NewFolder';

const FolderBase = () => {
    const NewFolderClick = () => {
        alert('test')
      }
      const [ Folder ] = useState([
        {
          id: 1,
          name: 'Geschichte',
        },
        {
          id: 2,
          name: 'Deutsch'
        }
    
      ])    

    return (
        <div className='Folder_Base'>
            <FolderHome />
            <NewFolder NewFolderClick={NewFolderClick} />
        </div>
    );
}

export default FolderBase;