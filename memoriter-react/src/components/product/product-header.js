import '../../styles/product-header.css';
import memoriterLogo from '../../components/Logo.png';
import languageIcon from '../../components/language-icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductHeader = ({ currentPage }) => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the register button

    return (
        <header className='product-header'>

            {/*If you click the logo, you will be redirected to the product page.*/}
            <img className='product-header-logo' src={memoriterLogo} alt='memoriter-logo' onClick={() => navigate('/product')}/>

            {/*quicklinks (navigation bar)*/}
            <nav className='product-header-quicklink-box'>
                <Link className='product-header-quicklink' to='/product'>
                    {currentPage === 'product' ? <span className='product-header-text-gradient'>Product</span> : <span>Product</span>}
                </Link>
                <Link className='product-header-quicklink' to='/about'>
                    {currentPage === 'about' ? <span className='product-header-text-gradient'>About</span> : <span>About</span>}
                </Link>
                <Link className='product-header-quicklink' to='/blog'>
                    {currentPage === 'blog' ? <span className='product-header-text-gradient'>Blog</span> : <span>Blog</span>}
                </Link>
                <Link className='product-header-quicklink' to='/download'>
                    {currentPage === 'download' ? <span className='product-header-text-gradient'>Download</span> : <span>Download</span>}
                </Link>
                <Link className='product-header-quicklink' to='/donate'>
                    {currentPage === 'donate' ? <span className='product-header-text-gradient'>Donate</span> : <span>Donate</span>}
                </Link>
                {/*the if else conditions changes the color of the links depending on the current open page*/}
            </nav>

            {/*sign in and register buttons*/}
            <Link className='product-header-sign-in' to='/login'>
                <span className='product-header-text-gradient'>Sign in</span>
            </Link>
            <Link className='product-header-register' to='/signup'
                onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                <div className='product-header-register-background' style={{filter: onHover}}/>
                <span className='product-header-register-text'>Register</span>
            </Link>

            {/*light and dark mode button*/}
            <button className='product-header-visual-mode-button'>
                <div className='product-header-visual-mode-icon'/>
            </button>

            {/*change language button*/}
            <button className='product-header-language-button'>
                <img src={languageIcon} alt='language-icon' className='product-header-language-icon'/>
            </button>

        </header>
    );
}

export default ProductHeader;