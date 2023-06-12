import './profile-dropdown.css';
import { firebase } from '../../technical/utils/mongo';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logOut = async () => {
    await signOut(firebase.auth);
    localStorage.removeItem('folderID');
    localStorage.removeItem('folderTitle');
    navigate('/login');
  };

  return (
    <section className='profile-dropdown'>
      <p className='no-hover'>
        Singed in as <em>{auth.currentUser.email}</em>
      </p>
      <hr />
      <p>Account</p>
      <p>Preferences</p>
      <p>
        <a href='https://memoriter.de/support' target='_blank' rel='noreferrer'>Help</a>
      </p>
      <hr />
      <p onClick={() => logOut()}>Sign Out</p>
    </section>
  );
};
export default ProfileDropdown;
