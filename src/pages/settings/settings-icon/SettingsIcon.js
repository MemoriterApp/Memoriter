import React from 'react';
import settingsIcon from '../../../images/icons/settings-icon.svg';
import SettingsClick from '../interaction/SettingsInteraction';
import { useState } from 'react';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import './settings-icon.css';

const SettingsIcon = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <button className='gear'>
                <img className='gear' src={settingsIcon} alt='settings' onClick={() => setModalIsOpen(true)}></img>
            </button>
            <div>
                {modalIsOpen && <SettingsClick />}
                {modalIsOpen && <Backdrop onClick={() => setModalIsOpen(false)} />}
            </div>
            <div onClick={() => setModalIsOpen(false)}>
                {modalIsOpen && <Backdrop />}
            </div>
        </div>
    );
}

export default SettingsIcon;
