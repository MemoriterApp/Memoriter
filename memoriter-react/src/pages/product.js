import ProductHeader from '../components/product/product-header';

const Product = () => {
    return (
        <>
            {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}
            <ProductHeader currentPage={'product'}/>
        </>
    );
}

export default Product;