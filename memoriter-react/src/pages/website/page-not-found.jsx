import memoriterLogo from '../../images/memoriter-logo.svg';
import WebsiteHead from '../../components/website/wrapper/website-head';
import WindowSizeAlert from '../../components/window-size-alert';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    const PageNotFoundBottomSpace = { //styles for extra space at the bottom on page scroll
        position: 'absolute',
        left: '0',
        top: '42px',
        width: '100%',
        height: '40px'
    }

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the get started button

    return (
        <>
           
            {/*Head*/}
            <WebsiteHead title='Page Not Found' description='This URL does not match any page.'/>

            {/*container with content*/}
            <main className='page-not-found'>

                <section className='page-not-found-question-mark'>?</section> {/*large question mark next to the text*/}

                <section> {/*extra div is important for layout*/}

                    {/*logo above the content*/}
                    <img className='page-not-found-logo' src={memoriterLogo} alt='memoriter-logo'/>

                    {/*text*/}
                    <h1 className='page-not-found-heading'>Page Not Found!</h1>
                    <p className='page-not-found-text'>This URL does not match any page. Please use another link or go back to an existing page.</p>

                    {/*button redirects to product page*/}
                    <Link
                        className='page-not-found-button' to='/product'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                        <div className='page-not-found-button-background' style={{filter: onHover}}/>
                        <span className='page-not-found-button-text'>Return to Website!</span>
                        <div style={PageNotFoundBottomSpace}/> {/*space at the bottom on page scroll*/}
                    </Link>

                </section>

           </main>

           {/*alert for too small screens*/}
           <WindowSizeAlert/>
        
        </>
    );
}

export default PageNotFound;