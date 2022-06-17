import Head from '../components/head';
import ProductHeader from '../components/product/product-header';

const Product = () => {
    return (
        <>
            {/*head*/}
            <Head 
                title=''
                description=''
            /> {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <ProductHeader currentPage='product'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}
        </>
    );
}

export default Product;