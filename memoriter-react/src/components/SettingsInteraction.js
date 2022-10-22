import Backdrop from './backdrop';
import Confirm from './confirm';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import ChangePreview from './Settings/changePreview';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../features/theme-slice';
import { displaySuccessMessage } from '../features/authentication-success-slice';
import { signOut, getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, query, where, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
const { db } = firebase

function SettingsClick() {

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const themeText = useSelector((state) => state.theme.value); //current light or dark mode text based on theme

    function onChangeTheme(theme) { //function to swap the current theme
        dispatch(changeTheme(theme)); //changes the theme
        localStorage.setItem('theme', theme); //the theme can be saved to localStorage
    }

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const [changePreview, openChangePreview] = useState(false);

    const auth = getAuth();

    const user = auth.currentUser;

    //states to check wether overlay is open
    const [changePassword, openChangePassword] = useState(false);
    const [changeEmail, openChangeEmail] = useState(false);
    const [deleteAccount, openDeleteAccount] = useState(false);
    const [deleteAccountConfirm, openDeleteAccountConfirm] = useState(false);
    const [deleteAccountUidCompare, setDeleteAccountUidCompare] = useState(false);

    //states to store user data
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userIdInput, setUserIdInput] = useState('');

    const [accountPassword, setAccountPassword] = useState('');

    //error states
    const [redBorderNewData, setRedBorderNewData] = useState({});
    const [redBorderAccountPassword, setRedBorderAccountPassword] = useState({});
    
    //success states
    const [updatedEmail, setUpdatedEmail] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    
    //logout stuff
    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(firebase.auth);
        localStorage.removeItem('syncedFolderID');
        localStorage.removeItem('syncedFolderTitle');

        dispatch(displaySuccessMessage('Successfully signed out!')); //sets state for the sign-in-main component to read to display a success message
        navigate('/login');
    }

    //change email function
    async function newEmailSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        if (newEmail === '') {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else if (newEmail !== confirmEmail) {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else {
            reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updateEmail(auth.currentUser, newEmail).then(() => {
                        return(
                            openChangeEmail(false),
                            setNewEmail(''),
                            setConfirmEmail(''),
                            setAccountPassword(''),
                            setRedBorderNewData({}),
                            setRedBorderAccountPassword({}),
                            setUpdatedEmail(true))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderNewData({});
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
        }
    }

    //change password function
    async function newPasswordSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        if (newPassword === '') {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else if (newPassword !== confirmPassword) {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else {
            reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updatePassword(auth.currentUser, newPassword).then(() => {
                        return(
                            openChangePassword(false),
                            setNewPassword(''),
                            setConfirmPassword(''),
                            setAccountPassword(''),
                            setRedBorderNewData({}),
                            setRedBorderAccountPassword({}),
                            setUpdatedPassword(true))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderNewData({});
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
        }
    }

    //delete account password confirm
    async function deleteAccountPasswordSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updateEmail(auth.currentUser, newEmail).then(() => {
                        return(
                            openDeleteAccountConfirm(true),
                            openDeleteAccount(false),
                            setAccountPassword(''))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
    }

    //delete user compare uid-input with uid
    const [deleteAccountConfirmUidMatchRerenderPrevent, setDeleteAccountConfirmUidMatchRerenderPrevent] = useState(false);

    if (deleteAccountConfirmUidMatchRerenderPrevent) {
        if (user.uid === userIdInput) {
            setDeleteAccountUidCompare(true)
            setDeleteAccountConfirmUidMatchRerenderPrevent(false)
        } else {
            setDeleteAccountUidCompare(false)
            setDeleteAccountConfirmUidMatchRerenderPrevent(false)
        }
    }

    async function deleteAccountFinal(e) {
        e.preventDefault();

        //delete user folders
        const foldersCollectionRef = collection(db, "folders"); //link zur folder-collection
        const foldersQuery = query(foldersCollectionRef, where("user", "==", auth.currentUser.uid)); //Variable zur Filtrierung nach den richtigen folders
        const foldersSnapshot = await getDocs(foldersQuery); //gefilterte folders werden abgefragt

        const foldersResults = foldersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
        foldersResults.forEach(async (foldersResult) => { //für jedes object wird die function ausgelöst
        const folderDocRef = doc(db, "folders", foldersResult.id); //Definition der Zieldaten (folders, die gelöscht werden)
        await deleteDoc(folderDocRef); //Zieldaten werden gelöscht
        })
        
        //delete user flashcards
        const flashcardsCollectionRef = collection(db, "flashcards"); //link zur flashcard-collection
        const flashcardsQuery = query(flashcardsCollectionRef, where("user", "==", auth.currentUser.uid)); //Variable zur Filtrierung nach den richtigen flashcards
        const flashcardsSnapshot = await getDocs(flashcardsQuery); //gefilterte flashcards werden abgefragt

        const flashcardsResults = flashcardsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
        flashcardsResults.forEach(async (flashcardsResult) => { //für jedes object wird die function ausgelöst
        const flashcardDocRef = doc(db, "flashcards", flashcardsResult.id); //Definition der Zieldaten (flashcards, die gelöscht werden)
        await deleteDoc(flashcardDocRef); //Zieldaten werden gelöscht
        })

        //delete user function (https://firebase.google.com/docs/auth/web/manage-users?hl=en)
        deleteUser(user).then(() => {
            return navigate('/login');
        }).catch((error) => {
            alert('An error has occurred while trying to delete your account, please try again later!" ('+error+')');
        });
    }

    return (
        <div className='settings-overlay'>
            <div className='settings-title-box'>
                <h1 className='settings-title'>SETTINGS</h1>
            </div>
            <p className='settings-sub' onClick={() => openProfile(true)}>PROFILE</p>
            {(themeText === 'dark' || !themeText) && <p className='settings-sub' onClick={() => onChangeTheme('light')}>THEME:&shy; DARK</p>}
            
            {themeText === 'light' && <p className='settings-sub' onClick={() => onChangeTheme('dark')}>THEME:&shy; LIGHT</p>}
            <p className='settings-sub' onClick={() => openChangePreview(true)}>CHANGE PREVIEW</p>
            <p className='sign-out-box' onClick={() => openSignOutView(true)}>SIGN OUT</p>
            {signOutView && <>
                <Confirm
                title='Do you really want to sign out?'
                onYes={logOut}
                onNo={() => openSignOutView(false)}
            />
                <Backdrop onClick={() => openSignOutView(false)} />
            </>}

            {changePreview && <ChangePreview/>}

            {profile && <>
                <div className='Settings-profile-body'>
                    <h2 className='Add_Folder_Form_Header' style={{ fontSize: '30px',cursor:'default' }}>Profile</h2>
                    <div>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>
                            Personal Info
                            {updatedEmail && <span className='Settings-profile-header' style={{position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px'}}>Email Updated!</span>}
                        </h1>

                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div style={{textAlign: 'left'}}>
                            <div className='Settings-profile-text' style={{ margin: '5px',}}>Personal Email:</div>
                            <div className='Settings-profile-text' style={{ color: '#bbb',  margin: '5px' }}>{user.email}</div>
                            <div className='Settings-profile-text' style={{ margin: '5px',cursor:'pointer' }}
                                onClick={() => {
                                    openChangeEmail(true);
                                    setUpdatedEmail(false);
                                    setUpdatedPassword(false);
                                }}>Edit</div>
                        </div>

                        {changeEmail && <div>
                            <div className='Settings-changemail-body'>

                            <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Update "{user.email}"</div>

                            <form onSubmit={newEmailSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="New Email..."
                                    type="mail"
                                    autocomplete='off'
                                    id="email"
                                    name="email"
                                    style={redBorderNewData}
                                    onChange={event => setNewEmail(event.target.value)}
                                    value={newEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Confirm New Email..."
                                    type="mail"
                                    autocomplete='off'
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    style={redBorderNewData}
                                    onChange={event => setConfirmEmail(event.target.value)}
                                    value={confirmEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />

                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openChangeEmail(false);
                                        setNewEmail('');
                                        setConfirmEmail('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Update</button>

                            </form>

                            </div>
                            <Backdrop onClick={() => openChangeEmail(false)} />
                        </div>}

                        {/*<div className='Settings-profile-text'>User ID:</div>
                        <div className='Settings-profile-text' style={{color: '#bbb'}}>{user.uid}</div>*/}
                        {/*<div>
                            <div className='Settings-profile-text'style={{float:'left',margin:'5px',}}>Username:</div>
                            <div className='Settings-profile-text'style={{float:'inline-start', margin:'5px'}}>Edit</div>
                        </div>*/}

                        {/*Wenn man etwas vor diesem punkt addiert muss man das <p> direkt hier drunter vergrößern */}
                        <p style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>
                            Password
                            {updatedPassword && <span className='Settings-profile-header' style={{position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px'}}>Password Updated!</span>}
                        </h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div className='Settings-profile-text' style={{ margin: '5px',cursor:'pointer'}}
                            onClick={() => {
                                openChangePassword(true);
                                setUpdatedEmail(false);
                                setUpdatedPassword(false);
                            }}>Change Password</div>

                        {/*form to enter new password */}

                        {changePassword && <div>
                            <div className='Settings-changemail-body' style={{ height: '350px' }}>
                                
                                <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Change Password</div>
                                
                                <form onSubmit={newPasswordSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Current Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="New Password..."
                                    type="password"
                                    autocomplete='off'
                                    id="newPassword"
                                    name="newPassword"
                                    style={redBorderNewData}
                                    onChange={event => setNewPassword(event.target.value)}
                                    value={newPassword}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Confirm New Password..."
                                    type="password"
                                    autocomplete='off'
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    style={redBorderNewData}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                    value={confirmPassword}
                                />
                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openChangePassword(false);
                                        setNewPassword('');
                                        setConfirmPassword('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Update</button>

                            </form>
                            
                            </div>
                            <Backdrop onClick={() => openChangePassword(false)} />
                        </div>}

                        <p style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px',  margin: '5px'}}>Account</h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '20px' }} />
                        <div className='Settings-profile-text' style={{ color: '#d83232', margin: '5px', cursor:'pointer'  }}
                            onClick={() => {
                                openDeleteAccount(true);
                                setUpdatedEmail(false);
                                setUpdatedPassword(false);
                            }}>Delete Account</div>
                        <div className='Settings-profile-text' style={{ fontSize: '15px', color: 'rgb(88, 167, 172)', margin: '5px'}} >If you delete your account, your data will be gone forever!</div>

                        {deleteAccount && <div>
                            <div className='Settings-changemail-body'>

                            <br/><br/><br/><br/>

                            <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Please enter your password to proceed!</div>

                            <form onSubmit={deleteAccountPasswordSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />

                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openDeleteAccount(false);
                                        setNewEmail('');
                                        setConfirmEmail('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Proceed</button>

                            </form>

                            </div>
                            <Backdrop onClick={() => openDeleteAccount(false)} />

                        </div>}

                        {deleteAccountConfirm && <div>
                            <div className='settings-delete-account-confirm-body'>
                                <br/>
                                <h2 className='Add_folder_Form_Header' style={{textAlign: 'center'}}>Do you really want to delete your account?</h2>
                                <p className='settings-delete-account-confirm-text' style={{fontSize: '20px'}}>
                                    If you delete your account, your data will be gone forever and cannot be restored.
                                </p>
                                <br/>
                                <p className='settings-delete-account-confirm-text' style={{color: 'white', fontWeight: 'normal'}}>
                                    Please enter your user id to confirm the deletion:
                                    <br/><br/>
                                    <span style={{color: '#bbb', fontWeight: 'normal'}}>{user.uid}</span>
                                </p>
                                <br/>

                                <form onSubmit={deleteAccountFinal}>
                                    <input
                                        className='Settings-changemail-form Add_Folder_Form_Input'
                                        style={{left: '50%', transform: 'translateX(-50%)', width: '80%'}}
                                        type='text'
                                        autocomplete='off'
                                        placeholder='Please enter your user id...'
                                        id="userId"
                                        name="userId"
                                        onChange={event => {setUserIdInput(event.target.value); setDeleteAccountConfirmUidMatchRerenderPrevent(true);}}
                                        value={userIdInput}
                                    />

                                    <br/>

                                    {deleteAccountUidCompare || <button 
                                        className='settings-delete-account-confirm-button'
                                        style={{backgroundColor: 'rgb(228, 48, 48)', borderColor: 'rgb(228, 48, 48)', opacity: '0.2', cursor: 'not-allowed'}}
                                        onClick={(e) => e.preventDefault()}
                                    >I understand the consequences, delete my account.</button>}

                                    {deleteAccountUidCompare && <button 
                                        className='settings-delete-account-confirm-button'
                                        style={{backgroundColor: 'rgb(228, 48, 48)', borderColor: 'rgb(228, 48, 48)'}}
                                        type='submit'
                                    >I understand the consequences, delete my account.</button>}

                                    <br/>

                                    <button
                                        className='settings-delete-account-confirm-button'
                                        onClick={() => {
                                            openDeleteAccountConfirm(false);
                                            setUserIdInput('');}}
                                    >Cancel</button>
                                    
                                    </form>

                            </div>
                            <Backdrop
                                onClick={() => {
                                    openDeleteAccountConfirm(false);
                                    setAccountPassword('');
                                }} />
                        </div>
                        }

                    </div>
                </div>
            </>}      
        </div>
    );
}
export default SettingsClick;