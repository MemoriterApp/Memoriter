import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import WindowSizeAlert from '../components/window-size-alert';

const Product = () => {
    return (
        <>
            {/*head*/}
            <Head
                title='Product'
                description='memoriter, learning, notes, home'
            /> {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <ProductHeader currentPage='product'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}
        
            {/*alert for too small screens*/}
            <WindowSizeAlert/>
        </>
    );
}

export default Product;