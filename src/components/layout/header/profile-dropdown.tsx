import './profile-dropdown.css';
import { firebase } from '../../../technical/utils/mongo';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { displaySuccessMessage } from '../../../technical/features/authentication-success-slice';
import BackdropTransparent from '../../backdrops/backdrop-transparent/backdrop-transparent';

const ProfileDropdown = ({
  onCloseProfileDropdown,
  onOpenSettings,
  onOpenProfile,
}: {
  onCloseProfileDropdown: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // used to manipulate global sate (react redux)
  const auth = getAuth();

  const logOut = async () => {
    await signOut(firebase.auth);
    dispatch(displaySuccessMessage('Successfully signed out!')); // sets state for the sign-in-main component to read to display a success message
    localStorage.removeItem('folderID');
    localStorage.removeItem('folderTitle');
    navigate('/sign-in');
  };

  return (
    <>
      <section className='profile-dropdown'>
        <p className='no-hover'>
          Singed in as <em>{auth.currentUser.email}</em>
        </p>
        <hr />
        <p onClick={() => onOpenProfile()}>Account</p>
        <p onClick={() => onOpenSettings()}>Preferences</p>
        <p>
          <a href='https://memoriter.de/support' target='_blank' rel='noreferrer'>
            Help
          </a>
        </p>
        <hr />
        <p onClick={() => logOut()}>Sign Out</p>
      </section>
      <BackdropTransparent onClick={() => onCloseProfileDropdown()} />
    </>
  );
};
export default ProfileDropdown;
