import './header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import memoriterLogo from '../../images/memoriter-logo.svg';
import chevronRight from '../../images/chevron-right.svg';
import searchIcon from '../../images/icons/search-icon.svg';
import pushPinIcon from '../../images/icons/push-pin-icon.svg';
import ProfileDropdown from './profile-dropdown';
import BackdropTransparent from '../backdrops/backdrop-transparent/backdrop-transparent';

const Header = ({ folder }: { folder: string }) => {
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <header className='header'>
      <button className='header-sidebar-button' />
      <img className='header-logo' src={memoriterLogo} alt='Memoriter' />
      <p className='header-path'>
        <img className='header-path-chevron' src={chevronRight} alt='>' />
        <Link to='/'>Home</Link>
        {folder === 'home' ? null : folder === '' ? (
          <>
            <img className='header-path-chevron' src={chevronRight} alt='>' />
            <Link to='/topic'>New Folder</Link>
          </>
        ) : (
          <>
            <img className='header-path-chevron' src={chevronRight} alt='>' />
            <Link to='/topic'>{folder}</Link>
          </>
        )}
      </p>
      <div className='header-flex-gap' />
      <div className='header-search'>
        <input className='header-search-input' placeholder='Search' />
        <img className='header-search-icon' src={searchIcon} alt='Search icon' />
      </div>
      <img className='header-pin-icon' src={pushPinIcon} alt='Push pin icon' />
      <div>
        <img
          className='header-profile'
          src='https://memoriter.de/static/410a539f70ab859eb1f071154c13c9e2/13156/placeholder-square.webp'
          alt='Profile'
          onClick={() => setOpenProfileDropdown(true)}
        />
        {openProfileDropdown && (
          <>
            <ProfileDropdown />
            <BackdropTransparent onClick={() => setOpenProfileDropdown(false)} />
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
