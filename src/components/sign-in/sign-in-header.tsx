import '../../styles/sign-in/sign-in-header.css';
import { useSelector } from 'react-redux';
import memoriterLogoWhite from '../../images/memoriter-logo-white.svg';
import memoriterLogoBlack from '../../images/memoriter-logo-black.svg';

const SignInHeader = () => {
  const theme: string = useSelector((state: any) => state.theme.value); // current light or dark mode icon based on theme
  return (
    <header className='sign-in-header'>
      {/* If you click the logo, you will be redirected to the product page. */}
      <div className='sign-in-header-navigation'>
        <a href='https://memoriter.de/'>
          <img
            className='sign-in-header-logo'
            src={theme === 'dark' ? memoriterLogoWhite : memoriterLogoBlack}
            alt='Memoriter'
          />
        </a>
      </div>
    </header>
  );
};
export default SignInHeader;
