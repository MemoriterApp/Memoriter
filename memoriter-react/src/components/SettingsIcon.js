import React from 'react';
import zahnrad from './zahnrad.png';

const SettingsIcon = () => {
    return (
        <div>
            <button className='gear'>
                <img className='gear' src={zahnrad}></img>
            </button>
        </div>
    );
}

export default SettingsIcon;
