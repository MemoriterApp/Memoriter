import '../../styles/product/product-footer.css';
import { Link } from 'react-router-dom';

const ProductFooter = () => {
    return (
        <footer className='product-footer'>

            {/*transition shape at the top*/}
            <div className='product-footer-top-transition-shape-left'/>
            <div className='product-footer-top-transition-shape-right'/>

            {/*columns of content*/}
            <div className='product-footer-content'>

                {/*lists of footer links*/}
                <nav>
                    <p className='product-footer-header'>App</p>
                    <Link className='product-footer-link' to='/login'>Sign In</Link>
                    <Link className='product-footer-link' to='/signup'>Register</Link>
                    <Link className='product-footer-link' to='/download'>Download</Link>
                    <Link className='product-footer-link' to='/releases'>Release Notes</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Company</p>
                    <Link className='product-footer-link' to='/product'>Product</Link>
                    <Link className='product-footer-link' to='/about'>About</Link>
                    <Link className='product-footer-link' to='/blog'>Blog</Link>
                    <Link className='product-footer-link' to='/donate'>Donate</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Legal</p>
                    <Link className='product-footer-link' to='/impressum'>Impressum</Link>
                    <Link className='product-footer-link' to='/terms'>Terms of Use</Link>
                    <Link className='product-footer-link' to='/privacy'>Privacy Policy</Link>
                    <Link className='product-footer-link' to='/cookies'>Cookie Policy</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Help</p>
                    <Link className='product-footer-link' to='/support'>Support</Link>
                    <Link className='product-footer-link' to='/faq'>FAQ</Link>
                    <Link className='product-footer-link' to='/report'>Bug Report</Link>
                    <a className='product-footer-link'>Cookie Settings</a>
                </nav>

                <nav> {/*eternal links*/}
                    <p className='product-footer-header'>Follow Us</p>
                    <a className='product-footer-link' href='https://www.twitter.com/' target='_blank' rel='noreferrer'>Twitter</a>
                    <a className='product-footer-link' href='https://www.youtube.com/' target='_blank' rel='noreferrer'>YouTube</a>
                    <a className='product-footer-link' href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>Instagram</a>
                    <a className='product-footer-link' href='' target='_blank' rel='noreferrer'>-PLACEHOLDER-</a>
                </nav>

            </div>

        </footer>
    );
}

export default ProductFooter;
