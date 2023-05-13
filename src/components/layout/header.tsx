import './header.css';
import { Link } from 'react-router-dom';
import memoriterLogo from '../../images/memoriter-logo.svg';
import chevronRight from '../../images/chevron-right.svg';
import searchIcon from '../../images/icons/search-icon.svg';
import pushPinIcon from '../../images/icons/push-pin-icon.svg';

const Header = () => {
  return (
    <header className='header-container'>
      <button className='header-sidebar-button' />
      <img className='header-logo' src={memoriterLogo} alt='Memoriter' />
      <p className='header-path'>
        <img className='header-path-chevron' src={chevronRight} alt='>' />
        <Link to='/'>Home</Link>
      </p>
      <div className='header-flex-gap' />
      <div className='header-search'>
        <input className='header-search-input' placeholder='Search' />
        <img className='header-search-icon' src={searchIcon} alt='Search icon' />
      </div>
      <img className='header-pin-icon' src={pushPinIcon} alt='Push pin icon' />
      <img
        className='header-profile'
        src='https://memoriter.de/static/410a539f70ab859eb1f071154c13c9e2/13156/placeholder-square.webp'
        alt='Profile'
      />
    </header>
  );
};
export default Header;
