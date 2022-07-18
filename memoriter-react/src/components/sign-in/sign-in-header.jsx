import '../../styles/sign-in/sign-in-header.css';
import memoriterLogo from '../../images/memoriter-logo.svg';
import { useNavigate } from 'react-router-dom';

const SignInHeader = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    return (
        <header className='sign-in-header'>

            {/*If you click the logo, you will be redirected to the product page.*/}
            <img className='sign-in-header-logo' src={memoriterLogo} alt='memoriter-logo' onClick={() => navigate('/product')}/>
        
        </header>
    );
}

export default SignInHeader;