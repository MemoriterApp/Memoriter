import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const ProductHeader = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    return (
        <header className='product-header'>
            {/*If you click the logo, you will be redirected to the product page.*/}
            <img className='product-header-logo' src={logo} alt='memoriter-logo' onClick={() => navigate('/product')}/>
            {/*Quicklinks:*/}
            <div className='product-header-quicklink-box'>
                <Link className='product-header-quicklink-current' to='/product'>Product</Link>
                <Link className='product-header-quicklink' to='/about'>About</Link>
                <Link className='product-header-quicklink' to='/blog'>Blog</Link>
                <Link className='product-header-quicklink' to='/download'>Download</Link>
                <Link className='product-header-quicklink' to='/donate'>Donate</Link>
            </div>
        </header>
    );
}

export default ProductHeader;