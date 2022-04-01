import React from 'react';

const FolderHome = ({ name }) => {
const DreiPunkteClick = () => {
    alert('Nein Simon so funktioniert das nicht')
}
const test = () => {
    alert('test')
}

    return (
        <div className='Folder_Body'>
            <button className='Button_Homepage' onClick={test}></button>
            <button className='Button_Homepage_Text' onClick={test}>{name}</button>
            <div className='Button_Homepage_Settings' onClick={DreiPunkteClick}>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
        </div>
    );
}

FolderHome.defaultProps = {
    name: 'New Folder'
}

export default FolderHome;