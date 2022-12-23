import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../change-preview/changePreview.css';
import './profile.css';
import { collection, query, where, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { signOut, getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import Backdrop from '../../../components/backdrops/backdrop';
import { firebase } from '../../../technical/utils/firebase';
import { displaySuccessMessage } from '../../../technical/features/authentication-success-slice';
import { useDispatch } from 'react-redux';
const { db } = firebase;




function Profile() {

	const dispatch = useDispatch(); //used to manipulate global sate (react redux)


	//states to check what preview mode
	const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);
	const [isBoth, setIsBoth] = useState(false);

	//use Effekt to safe the state in local storage, so that it can be used in topic.js
	useEffect(() => {
		localStorage.setItem('onlyQuestion', JSON.stringify(isOnlyQuestion)); //sets the value of key 'OnlyQuestion' to 'isOnlyQuestion' state
	}, [isOnlyQuestion]);

	useEffect(() => {
		localStorage.setItem('both', JSON.stringify(isBoth)); //sets the value of key 'Both' to 'isBoth' state
	}, [isBoth]);

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

	const auth = getAuth();

	const user = auth.currentUser;

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
	};

	//change email function
	async function newEmailSubmit(e) {
		e.preventDefault();

		const credential = EmailAuthProvider.credential( //required input for password confirm
			user.email,
			accountPassword
		);

		if (newEmail === '') {
			setRedBorderNewData({ borderColor: 'rgb(228, 48, 48)' });
			setRedBorderAccountPassword({});
		} else if (newEmail !== confirmEmail) {
			setRedBorderNewData({ borderColor: 'rgb(228, 48, 48)' });
			setRedBorderAccountPassword({});
		} else {
			reauthenticateWithCredential(auth.currentUser, credential)
				.then((result) => {
					updateEmail(auth.currentUser, newEmail).then(() => {
						return (
							openChangeEmail(false),
							setNewEmail(''),
							setConfirmEmail(''),
							setAccountPassword(''),
							setRedBorderNewData({}),
							setRedBorderAccountPassword({}),
							setUpdatedEmail(true));
					});
				})
				.catch((error) => {
					switch (error.code) {
					case error.code:
						setRedBorderNewData({});
						setRedBorderAccountPassword({ borderColor: 'rgb(228, 48, 48)' });
						break;
					}
				});
		}
	}

	//change password function
	async function newPasswordSubmit(e) {
		e.preventDefault();

		const credential = EmailAuthProvider.credential( //required input for password confirm
			user.email,
			accountPassword
		);

		if (newPassword === '') {
			setRedBorderNewData({ borderColor: 'rgb(228, 48, 48)' });
			setRedBorderAccountPassword({});
		} else if (newPassword !== confirmPassword) {
			setRedBorderNewData({ borderColor: 'rgb(228, 48, 48)' });
			setRedBorderAccountPassword({});
		} else {
			reauthenticateWithCredential(auth.currentUser, credential)
				.then((result) => {
					updatePassword(auth.currentUser, newPassword).then(() => {
						return (
							openChangePassword(false),
							setNewPassword(''),
							setConfirmPassword(''),
							setAccountPassword(''),
							setRedBorderNewData({}),
							setRedBorderAccountPassword({}),
							setUpdatedPassword(true));
					});
				})
				.catch((error) => {
					switch (error.code) {
					case error.code:
						setRedBorderNewData({});
						setRedBorderAccountPassword({ borderColor: 'rgb(228, 48, 48)' });
						break;
					}
				});
		}
	}

	//delete account password confirm
	async function deleteAccountPasswordSubmit(e) {
		e.preventDefault();

		const credential = EmailAuthProvider.credential( //required input for password confirm
			user.email,
			accountPassword
		);

		reauthenticateWithCredential(auth.currentUser, credential)
			.then((result) => {
				updateEmail(auth.currentUser, newEmail).then(() => {
					return (
						openDeleteAccountConfirm(true),
						openDeleteAccount(false),
						setAccountPassword(''));
				});
			})
			.catch((error) => {
				switch (error.code) {
				case error.code:
					setRedBorderAccountPassword({ borderColor: 'rgb(228, 48, 48)' });
					break;
				}
			});
	}

	//delete user compare uid-input with uid
	const [deleteAccountConfirmUidMatchRerenderPrevent, setDeleteAccountConfirmUidMatchRerenderPrevent] = useState(false);

	if (deleteAccountConfirmUidMatchRerenderPrevent) {
		if (user.uid === userIdInput) {
			setDeleteAccountUidCompare(true);
			setDeleteAccountConfirmUidMatchRerenderPrevent(false);
		} else {
			setDeleteAccountUidCompare(false);
			setDeleteAccountConfirmUidMatchRerenderPrevent(false);
		}
	}



	async function deleteAccountFinal(e) {
		e.preventDefault();

		//delete user folders
		const foldersCollectionRef = collection(db, 'folders'); //link zur folder-collection
		const foldersQuery = query(foldersCollectionRef, where('user', '==', auth.currentUser.uid)); //Variable zur Filtrierung nach den richtigen folders
		const foldersSnapshot = await getDocs(foldersQuery); //gefilterte folders werden abgefragt

		const foldersResults = foldersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
		foldersResults.forEach(async (foldersResult) => { //für jedes object wird die function ausgelöst
			const folderDocRef = doc(db, 'folders', foldersResult.id); //Definition der Zieldaten (folders, die gelöscht werden)
			await deleteDoc(folderDocRef); //Zieldaten werden gelöscht
		});

		//delete user flashcards
		const flashcardsCollectionRef = collection(db, 'flashcards'); //link zur flashcard-collection
		const flashcardsQuery = query(flashcardsCollectionRef, where('user', '==', auth.currentUser.uid)); //Variable zur Filtrierung nach den richtigen flashcards
		const flashcardsSnapshot = await getDocs(flashcardsQuery); //gefilterte flashcards werden abgefragt

		const flashcardsResults = flashcardsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
		flashcardsResults.forEach(async (flashcardsResult) => { //für jedes object wird die function ausgelöst
			const flashcardDocRef = doc(db, 'flashcards', flashcardsResult.id); //Definition der Zieldaten (flashcards, die gelöscht werden)
			await deleteDoc(flashcardDocRef); //Zieldaten werden gelöscht
		});

		//delete user function (https://firebase.google.com/docs/auth/web/manage-users?hl=en)
		deleteUser(user).then(() => {
			return navigate('/login');
		}).catch((error) => {
			alert('An error has occurred while trying to delete your account, please try again later!" (' + error + ')');
		});
	}


	return (
		<div className='profile-body'>

			<div className='profile-title-box'>
				<h1 className='settings-title'>PROFILE</h1>
			</div>

			<div>

				<h1 className='profile-header'>
                    Personal information
					{updatedEmail && <span className='profile-header' style={{ position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px' }}>Email Updated!</span>}
				</h1>

				<div className='Settings-line'></div>

				<p style={{ fontSize: '10px' }} />

				<div style={{ textAlign: 'left' }}>
					<div className='profile-sub'>Personal Email:</div>
					<div className='profile-sub' style={{ color: '#36747D', margin: '5px' }}>{user.email}</div>
					<div className='profile-sub' style={{ margin: '5px', cursor: 'pointer' }}
						onClick={() => {
							openChangeEmail(true);
							setUpdatedEmail(false);
							setUpdatedPassword(false);
						}}>Edit</div>
				</div>

				{changeEmail && <div>
					<div className='Settings-changemail-body' style={{ height: '380px' }}>

						<div className='profile-header' style={{ textAlign: 'center' }}>Update "{user.email}"</div>

						<form onSubmit={newEmailSubmit}>

							<input className='add-folder-form-input'
								placeholder='New Email...'
								type='mail'
								autoComplete='off'
								id='email'
								name='email'
								style={redBorderNewData}
								onChange={(event) => setNewEmail(event.target.value)}
								value={newEmail}
							/>
							<br />
							<br />
							<input className='add-folder-form-input'
								placeholder='Confirm New Email...'
								type='mail'
								autoComplete='off'
								id='confirmEmail'
								name='confirmEmail'
								style={redBorderNewData}
								onChange={(event) => setConfirmEmail(event.target.value)}
								value={confirmEmail}
							/>
							<br />
							<br />
							<input className='add-folder-form-input'
								autoComplete='current-password'
								placeholder='Password...'
								type='password'
								id='accountPassword'
								name='accountPassword'
								style={redBorderAccountPassword}
								onChange={(event) => setAccountPassword(event.target.value)}
								value={accountPassword}
							/>

							<br />

							<button
								className='Settings-changemail-cancel'
								onClick={() => {
									openChangeEmail(false);
									setNewEmail('');
									setConfirmEmail('');
									setAccountPassword('');
									setRedBorderNewData({});
									setRedBorderAccountPassword({});
								}}
							>Cancel</button>

							<button
								className='Settings-changemail-change'
								type='submit'
							>Update</button>

						</form>

					</div>
					<Backdrop onClick={() => openChangeEmail(false)} />
				</div>}

				{/*<div className='profile-sub'>User ID:</div>
                <div className='profile-sub' style={{color: '#bbb'}}>{user.uid}</div>*/}
				{/*<div>
                    <div className='profile-sub'style={{float:'left',margin:'5px',}}>Username:</div>
                    <div className='profile-sub'style={{float:'inline-start', margin:'5px'}}>Edit</div>
                </div>*/}

				{/*Wenn man etwas vor diesem punkt addiert muss man das <p> direkt hier drunter vergrößern */}
				<p style={{ fontSize: '30px' }} />

			</div>
			<div style={{ textAlign: 'left' }}>
				<h1 className='profile-header'>
                    Password
					{updatedPassword && <span className='profile-header' style={{ position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px' }}>Password Updated!</span>}
				</h1>
				<div className='Settings-line'></div>

				<p style={{ fontSize: '10px' }} />

				<div className='profile-sub' style={{ cursor: 'pointer' }}
					onClick={() => {
						openChangePassword(true);
						setUpdatedEmail(false);
						setUpdatedPassword(false);
					}}>Change Password</div>

				{/*form to enter new password */}

				{changePassword && <div>
					<div className='Settings-changemail-body' style={{ height: '350px' }}>

						<div className='profile-sub'>Change Password</div>

						<form onSubmit={newPasswordSubmit}>

							<input className='add-folder-form-input'
								placeholder='Current Password...'
								type='password'
								id='accountPassword'
								name='accountPassword'
								style={redBorderAccountPassword}
								onChange={(event) => setAccountPassword(event.target.value)}
								value={accountPassword}
							/>
							<br />
							<br />
							<input className='add-folder-form-input'
								placeholder='New Password...'
								type='password'
								autoComplete='new-password'
								id='newPassword'
								name='newPassword'
								style={redBorderNewData}
								onChange={(event) => setNewPassword(event.target.value)}
								value={newPassword}
							/>
							<br />
							<br />
							<input className='add-folder-form-input'
								placeholder='Confirm New Password...'
								type='password'
								autoComplete='new-password'
								id='confirmPassword'
								name='confirmPassword'
								style={redBorderNewData}
								onChange={(event) => setConfirmPassword(event.target.value)}
								value={confirmPassword}
							/>
							<br />

							<button
								className='Settings-changemail-cancel'
								onClick={() => {
									openChangePassword(false);
									setNewPassword('');
									setConfirmPassword('');
									setAccountPassword('');
									setRedBorderNewData({});
									setRedBorderAccountPassword({});
								}}
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
			<div style={{ textAlign: 'left' }}>
				<h1 className='profile-header'>Account</h1>

				<div className='Settings-line'></div>

				<p style={{ fontSize: '20px' }} />

				<div className='profile-sub' style={{ color: '#d83232', cursor: 'pointer' }}
					onClick={() => {
						openDeleteAccount(true);
						setUpdatedEmail(false);
						setUpdatedPassword(false);
					}}>Delete Account</div>

				<br></br>

				<div className='profile-sub' style={{ fontSize: '1.75ch', color: '#36747D' }} >If you delete your account, your data will be gone!</div>

				{deleteAccount && <div>
					<div className='Settings-changemail-body'>

						<br /><br />

						<div className='profile-sub'>Please enter your password to proceed!</div>

						<form onSubmit={deleteAccountPasswordSubmit}>

							<input className='Settings-changemail-form folder-form-input'
								placeholder='Password...'
								type='password'
								id='accountPassword'
								name='accountPassword'
								style={redBorderAccountPassword}
								onChange={(event) => setAccountPassword(event.target.value)}
								value={accountPassword}
							/>

							<br />

							<button
								className='Settings-changemail-cancel'
								onClick={() => {
									openDeleteAccount(false);
									setNewEmail('');
									setConfirmEmail('');
									setAccountPassword('');
									setRedBorderNewData({});
									setRedBorderAccountPassword({});
								}}
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
						<br />
						<h2 className='settings-title' style={{ textAlign: 'center' }}>Do you really want to delete your account?</h2>
						<p className='settings-delete-account-confirm-text' style={{ fontSize: '20px' }}>
                            If you delete your account, your data will be gone forever and cannot be restored.
						</p>
						<br />
						<p className='settings-delete-account-confirm-text' style={{ color: 'var(--color-font)', fontWeight: 'normal' }}>
                            Please enter your user id to confirm the deletion:
							<br /><br />
							<span style={{ color: '#bbb', fontWeight: 'normal' }}>{user.uid}</span>
						</p>
						<br />

						<form onSubmit={deleteAccountFinal}>
							<input
								className='add-folder-form-input'
								style={{ left: '50%', transform: 'translateX(-50%)', width: '80%' }}
								type='text'
								autoComplete='off'
								placeholder='Please enter your user id...'
								id='userId'
								name='userId'
								onChange={(event) => { setUserIdInput(event.target.value); setDeleteAccountConfirmUidMatchRerenderPrevent(true); }}
								value={userIdInput}
							/>

							<br />

							{deleteAccountUidCompare || <button
								className='settings-delete-account-confirm-button'
								style={{ backgroundColor: 'rgb(228, 48, 48)', borderColor: 'rgb(228, 48, 48)', opacity: '0.2', cursor: 'not-allowed' }}
								onClick={(e) => e.preventDefault()}
							>I understand the consequences, delete my account.</button>}

							{deleteAccountUidCompare && <button
								className='settings-delete-account-confirm-button'
								style={{ backgroundColor: 'rgb(228, 48, 48)', borderColor: 'rgb(228, 48, 48)' }}
								type='submit'
							>I understand the consequences, delete my account.</button>}

							<br />

							<button
								className='settings-delete-account-confirm-button'
								onClick={() => {
									openDeleteAccountConfirm(false);
									setUserIdInput('');
								}}
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
	);
}

export default Profile;