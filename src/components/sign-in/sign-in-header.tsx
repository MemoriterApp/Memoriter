import '../../styles/sign-in/sign-in-header.css';
import memoriterLogo from '../../images/memoriter-logo.svg';

const SignInHeader = () => {
  return (
    <header className='sign-in-header'>
      {/* If you click the logo, you will be redirected to the product page. */}
      <div className='sign-in-header-navigation'>
      <a href='https://memoriter.de/'>
        <img className='sign-in-header-logo' src={memoriterLogo} alt='Memoriter' />
      </a></div>
    </header>
  );
};

export default SignInHeader;
