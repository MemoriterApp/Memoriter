import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const ProductHeader = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    return (
        <header className='product-header'>
            {/*if you click the logo, you will be redirected to the product page*/}
            <img className='product-header-logo' src={logo} alt='memoriter-logo' onClick={() => navigate('/product')}/>
        </header>
    );
}

export default ProductHeader;