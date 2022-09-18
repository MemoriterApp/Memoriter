import ProductWrapper from '../../components/website/wrapper/website-wrapper';
import ProductBanner from '../../components/website/product/product-banner';
import ProductMain from '../../components/website/product/product-main';
import ProductStories from '../../components/website/product/product-stories';

const Product = () => {
    return (
        <ProductWrapper
            title='The all-in-one learning environment'
            description=''
            currentPage='product'
        >
        
            {/*banner with slogan and get started button*/}
            <ProductBanner/>
            
            {/*basic main layout and texts*/}
            <ProductMain/>

            {/*slider with customer stories*/}
            <ProductStories/>

        </ProductWrapper>
    );
}

export default Product;