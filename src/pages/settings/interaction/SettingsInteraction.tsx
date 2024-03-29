import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import Confirm from '../../../components/confirm/confirm';
import { useState } from 'react';
import { firebase } from '../../../technical/utils/mongo';
import { useNavigate } from 'react-router-dom';
import ChangePreview from '../change-preview/changePreview';
import Profile from '../profile/profile';
import './settings-interaction.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../../technical/features/theme-slice';
import { signOut } from 'firebase/auth';

function SettingsClick() {

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const themeText = useSelector((state: any) => state.theme.value); //current light or dark mode text based on theme

    function onChangeTheme(theme: string) { //function to swap the current theme
        dispatch(changeTheme(theme)); //changes the theme
        localStorage.setItem('theme', theme); //the theme can be saved to localStorage
    }

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const [changePreview, openChangePreview] = useState(false);

    //logout stuff
    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(firebase.auth);
        localStorage.removeItem('folderID');
        localStorage.removeItem('folderTitle');

        navigate('/login');
    };



    return (
        <div className='settings-overlay'>
            <div className='settings-title-box'>
                <h1 className='settings-title'>SETTINGS</h1>
            </div>
            <p className='settings-sub' onClick={() => openProfile(true)}>PROFILE</p>

            {(themeText === 'light' || !themeText) && <p className='settings-sub' onClick={() => onChangeTheme('dark')}>
                THEME:&shy; <p className='theme-indicator' style={{ backgroundColor: '#202020', color: '#ffffff' }}>Dark</p>
            </p>}

            {themeText === 'dark' && <p className='settings-sub' onClick={() => onChangeTheme('light')}>
                THEME:&shy; <p className='theme-indicator' style={{ backgroundColor: '#eeeeee', color: '#000000' }}>LIGHT</p>
            </p>}

            <p className='settings-sub' onClick={() => openChangePreview(true)}>CHANGE PREVIEW</p>
            <p className='sign-out-box' onClick={() => openSignOutView(true)}>SIGN OUT</p>

            {signOutView && <>
                <Confirm
                    title='Do you really want to sign out?'
                    onConfirm={logOut}
                    onCancel={() => openSignOutView(false)} />

                <Backdrop onClick={() => openSignOutView(false)} />
            </>}

            {changePreview && <ChangePreview />}

            {profile && <Profile />}
        </div>
    );
}
export default SettingsClick;