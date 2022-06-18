import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductBanner from '../components/product/product-banner';
import ProductMain from '../components/product/product-main';
import ProductFooter from '../components/product/product-footer';
import CookieBanner from '../components/cookie-banner';
import WindowSizeAlert from '../components/window-size-alert';

const Product = () => {
    return (
        <>
            {/*head*/}
            <Head title='The all-in-one-learning-environment' description='memoriter, learning, notes, home'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <ProductHeader currentPage='product'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}

            {/*style is needed for aligning the items correctly*/}
            <div style={{display: 'flex', flexDirection: 'column', minHeight: 'calc100vh'}}>

                {/*banner with slogan and get started button*/}
                <ProductBanner/>

                {/*basic main layout and texts*/}
                <ProductMain/>

            </div>

            {/*footer*/}
            <ProductFooter/>

            {/*cookie banner*/}
            <CookieBanner/>

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default Product;