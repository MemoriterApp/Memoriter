import React from 'react';

const FolderHome = ({ name }) => {
const DreiPunkteClick = () => {
    alert('Nein Simon so funktioniert das nicht')
}

    return (
        <div>
            <button className='Button_Homepage'></button>
            <button className='Button_Homepage_Space'></button>
            <button className='Button_Homepage_Text'>{name}</button>
            <div className='three-dots' onClick={DreiPunkteClick}>
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

/*function FolderHome(props) {
    const name = props.name;
    return (
        <div>
            <button className='Button_Homepage'></button>
            <button className='Button_Homepage_Space'></button>
            <button className='Button_Homepage_Text'>{name}</button>
        </div>
    );
}
*/

export default FolderHome;