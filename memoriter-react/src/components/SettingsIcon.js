import React from 'react';
import zahnrad from './zahnrad.png';
import SettingsClick from './SettingsInteraction';
import { useState } from 'react';
import Backdrop from './backdrop';

const SettingsIcon = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function settingsHandler() {
        setModalIsOpen(true);
    }
    function closingHandler() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <button className='gear'>
                <img className='gear' src={zahnrad} onClick={settingsHandler}></img>
            </button>
            <div>
                {modalIsOpen && <SettingsClick/>}
                {modalIsOpen && <Backdrop onClick={closingHandler}/>}
            </div>
            <div  onClick={backdropClick}>
                    {modalIsOpen && <Backdrop/>}
            </div>
        </div>
    );
}

export default SettingsIcon;
