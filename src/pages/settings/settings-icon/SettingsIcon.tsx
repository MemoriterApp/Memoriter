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
  <img className='gear-img' src={settingsIcon} alt='settings' onClick={() => setModalIsOpen(true)} />
</button>

            <div>
                {modalIsOpen && <SettingsClick />}
                {modalIsOpen && <Backdrop onClick={() => setModalIsOpen(false)} />}
            </div>
        </div>
    );
};

export default SettingsIcon;
