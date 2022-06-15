import logo from '../../components/Logo.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductHeader = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const [onHover, setOnHover] = useState('brightness(1)');

    return (
        <header className='product-header'>
            {/*If you click the logo, you will be redirected to the product page.*/}
            <img className='product-header-logo' src={logo} alt='memoriter-logo' onClick={() => navigate('/product')}/>
            {/*Quicklinks:*/}
            <nav className='product-header-quicklink-box'>
                <Link className='product-header-quicklink' to='/product'>
                    <span className='product-header-text-gradient'>Product</span>
                </Link>
                <Link className='product-header-quicklink' to='/about'>About</Link>
                <Link className='product-header-quicklink' to='/blog'>Blog</Link>
                <Link className='product-header-quicklink' to='/download'>Download</Link>
                <Link className='product-header-quicklink' to='/donate'>Donate</Link>
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
        </header>
    );
}

export default ProductHeader;