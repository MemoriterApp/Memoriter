import logo from '../../components/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const ProductHeader = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

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
            <Link className='product-header-sign-in' to='/login'>
                <span className='product-header-text-gradient'>Sign in</span>
            </Link>
            <Link className='product-header-register' to='signup'>Register</Link>
        </header>
    );
}

export default ProductHeader;