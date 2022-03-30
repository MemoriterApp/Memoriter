import React from 'react';

const FolderHome = ({ name }) => {
    return (
        <div>
            <button className='Button_Homepage'></button>
            <button className='Button_Homepage_Space'></button>
            <button className='Button_Homepage_Text'>{name}</button>
        </div>
    );
}

FolderHome.defaultProps = {
    name: 'New Folder'
}

export default FolderHome;