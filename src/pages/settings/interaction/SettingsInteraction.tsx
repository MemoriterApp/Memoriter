import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import Confirm from '../../../components/confirm/confirm';
import { useState } from 'react';
import { firebase } from '../../../technical/utils/firebase';
import { useNavigate } from 'react-router-dom';
import ChangePreview from '../change-preview/changePreview';
import Profile from '../profile/profile';
import './settings-interaction.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../../technical/features/theme-slice';
import { displaySuccessMessage } from '../../../technical/features/authentication-success-slice';
import { signOut } from 'firebase/auth';


function SettingsClick() {

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const themeText = useSelector((state: any) => state.theme.value); //current light or dark mode text based on theme

    function onChangeTheme(theme) { //function to swap the current theme
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
        localStorage.removeItem('syncedFolderID');
        localStorage.removeItem('syncedFolderTitle');

        dispatch(displaySuccessMessage('Successfully signed out!')); //sets state for the sign-in-main component to read to display a success message
        navigate('/login');
    };



    return (
        <div className='settings-overlay'>
            <div className='settings-title-box'>
                <h1 className='settings-title'>SETTINGS</h1>
            </div>
            <p className='settings-sub' onClick={() => openProfile(true)}>PROFILE</p>

            {(themeText === 'light' || !themeText) && <p className='settings-sub' onClick={() => onChangeTheme('dark')}>THEME:&shy; LIGHT</p>}

            {themeText === 'dark' && <p className='settings-sub' onClick={() => onChangeTheme('light')}>THEME:&shy; DARK</p>}

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