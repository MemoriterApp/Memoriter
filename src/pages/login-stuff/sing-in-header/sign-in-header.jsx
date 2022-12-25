import memoriterLogo from '../../images/memoriter-logo.svg';
import { Link } from 'react-router-dom';

const SignInHeader = () => {

    return (
        <header className='sign-in-header'>

            {/*If you click the logo, you will be redirected to the product page.*/}
            <Link to='/product'><img className='sign-in-header-logo' src={memoriterLogo} alt='memoriter-logo'/></Link>
        
        </header>
    );
};

export default SignInHeader;