import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductFooter from '../components/product/product-footer';
import AboutMain from '../components/about/about-main';

const About = () => {
    return (
        <>

            {/*head*/}
            <Head title='About' description=''/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header, same as product*/}
            <ProductHeader currentPage='about'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}

            {/*style is needed for aligning the items correctly*/}
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                {/*basic main layout and texts*/}
                <AboutMain/>

            </div>

            {/*footer, same as product*/}
            <ProductFooter/>

        </>
    );
}

export default About;