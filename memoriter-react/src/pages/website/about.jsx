import ProductWrapper from '../../components/website/wrapper/website-wrapper';
import AboutBanner from '../../components/website/about/about-banner';
import AboutMain from '../../components/website/about/about-main';

const About = () => {
    return (
        <ProductWrapper
            title='About'
            description='Find out who we are and about our vision.'
            currentPage='about'
        >
            {/*banner with introduction*/}
            <AboutBanner/>

            {/*basic main layout and texts*/}
            <AboutMain/>

        </ProductWrapper>
    );
}

export default About;