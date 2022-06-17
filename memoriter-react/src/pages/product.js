import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
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

            {/*cookie banner*/}
            <CookieBanner/>

            {/*alert for too small screens*/}
            <WindowSizeAlert/>
        </>
    );
}

export default Product;