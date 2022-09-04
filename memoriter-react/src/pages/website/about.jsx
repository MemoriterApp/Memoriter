import ProductWrapper from '../../components/website/product/product-wrapper';
import AboutMain from '../../components/website/about/about-main';

const About = () => {
    return (
        <ProductWrapper
            title='About'
            description=''
            currentPage='about'
        >

            {/*basic main layout and texts*/}
            <AboutMain/>

        </ProductWrapper>
    );
}

export default About;