import './header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import memoriterLogo from '../../images/memoriter-logo.svg';
import chevronRight from '../../images/chevron-right.svg';
import searchIcon from '../../images/icons/search-icon.svg';
import starIcon from '../../images/icons/star-icon.svg';
import starIconFilled from '../../images/icons/star-icon-filled.svg';
import profileIcon from '../../images/icons/profile-icon.svg';
import ProfileDropdown from './profile-dropdown';
import BackdropTransparent from '../backdrops/backdrop-transparent/backdrop-transparent';

const Header = ({
  path,
  favoriteState,
  onSidebarButtonClick,
  onSidebarButtonHoverEnter,
  onSidebarButtonHoverLeave,
}: {
  path: string;
  favoriteState: boolean;
  onSidebarButtonClick: () => void;
  onSidebarButtonHoverEnter: () => void;
  onSidebarButtonHoverLeave: () => void;
}) => {
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <header className='header'>
      <button
        className='header-sidebar-button'
        onClick={() => onSidebarButtonClick()}
        onMouseEnter={() => onSidebarButtonHoverEnter()}
        onMouseLeave={() => onSidebarButtonHoverLeave()}
      />
      <Link to='/'>
        <img className='header-logo' src={memoriterLogo} alt='Memoriter' />
      </Link>
      <p className='header-path'>
        <img className='header-path-chevron' src={chevronRight} alt='>' />
        <Link to='/'>Home</Link>
        {path === 'home' ? null : path === '' ? (
          <>
            <img className='header-path-chevron' src={chevronRight} alt='>' />
            <Link to='/topic'>New Folder</Link>
          </>
        ) : (
          <>
            <img className='header-path-chevron' src={chevronRight} alt='>' />
            <Link to='/topic'>{path}</Link>
          </>
        )}
      </p>
      <div className='header-flex-gap' />
      {path !== 'home' && (
        <img
          className='header-pin-icon'
          src={favoriteState ? starIconFilled : starIcon}
          alt='Star icon'
        />
      )}
      <div className='header-search'>
        <input className='header-search-input' placeholder='Search' />
        <img className='header-search-icon' src={searchIcon} alt='Search icon' />
      </div>
      <div>
        <img
          className='header-profile'
          src={profileIcon}
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
