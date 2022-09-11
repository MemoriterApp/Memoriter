import memoriterLogo from '../../../images/memoriter-logo.svg';
import languageIcon from '../../../images/icons/language-icon.svg';
import lightModeIcon from '../../../images/icons/light-mode-icon.svg';
import darkModeIcon from '../../../images/icons/dark-mode-icon.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../../features/theme-slice';
import cookies from '../../../utils/cookies';

const WebsiteHeader = ({ currentPage, onOpenLanguageSelect }) => {

    const dispatch = useDispatch(); //used to manipulate global state (react redux)

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the register button
    const [onHoverAlt, setOnHoverAlt] = useState('brightness(1)'); //hover effect for alternative mobile register button

    const [mobileSidebar, setMobileSidebar] = useState('-280px'); //variable if the mobile nav sidebar is open or not
    function toggleMobileSidebar() { //function for opening and closing the mobile nav sidebar
        if (mobileSidebar === '-280px') { //if else condition is for opening and closing correctly
            setMobileSidebar('0');
        } else {
            setMobileSidebar('-280px');
        };
    };

    const [scrollProgress, setScrollProgress] = useState(0); //value for the scroll progress
    const onScroll = () => { //getting the scroll data
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrolled = (scroll / height) * 100;

        setScrollProgress(scrolled);
    };

    useEffect(() => { //the useEffect is important for getting the value if it is scrolling
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const themeIcon = useSelector((state) => state.theme.value); //current light or dark mode icon based on theme

    function onChangeTheme(theme) { //function to swap the current theme
        dispatch(changeTheme(theme)); //changes the theme

        if (JSON.parse(cookies.getCookie('accepted-cookies')).functional) { //checks if functional cookies are accepted
            localStorage.setItem('theme', theme); //if functional cookies are accepted, then the theme can be saved to localStorage
        };
    };

    return (
        <header className='website-header'>

            {/*If you click the logo, you will be redirected to the product page.*/}
            <Link to='/product'><img className='website-header-logo' src={memoriterLogo} alt='memoriter-logo'/></Link>

            {/*button for expanding side bar for small screens*/}
            <button className='website-header-mobile-sidebar-button' onClick={toggleMobileSidebar}>
                <div className='website-header-mobile-sidebar-icon'>|||</div>
            </button>

            {/*quicklinks (navigation bar)*/}
            <nav className='website-header-quicklink-box' style={{right: mobileSidebar}}> {/*expandable mobile nav sidebar, displays when button is clicked (changes className)*/}
                <Link className='website-header-quicklink' to='/product'>
                    {currentPage === 'product' ? <span className='website-header-text-gradient'>Product</span> : <span>Product</span>}
                </Link>
                <Link className='website-header-quicklink' to='/about'>
                    {currentPage === 'about' ? <span className='website-header-text-gradient'>About</span> : <span>About</span>}
                </Link>
                <Link className='website-header-quicklink' to='/blog'>
                    {currentPage === 'blog' ? <span className='website-header-text-gradient'>Blog</span> : <span>Blog</span>}
                </Link>
                <Link className='website-header-quicklink' to='/download'>
                    {currentPage === 'download' ? <span className='website-header-text-gradient'>Download</span> : <span>Download</span>}
                </Link>
                <Link className='website-header-quicklink' to='/donate'>
                    {currentPage === 'donate' ? <span className='website-header-text-gradient'>Donate</span> : <span>Donate</span>}
                </Link>
                {/*the if else conditions changes the color of the links depending on the current open page*/}

                {/*light and dark mode buttons, icon depends on the current mode*/}
                {(themeIcon === 'dark' || !themeIcon) && <button className='website-header-theme-button' onClick={() => onChangeTheme('light')}>
                    <img className='website-header-icon' src={lightModeIcon} alt='light-mode-icon'/>
                </button>}
                {themeIcon === 'light' && <button className='website-header-theme-button' onClick={() => onChangeTheme('dark')}>
                    <img className='website-header-icon' src={darkModeIcon} alt='dark-mode-icon'/>
                </button>}

                {/*change language button*/}
                <button className='website-header-language-button'>
                    <img className='website-header-icon' src={languageIcon} alt='language-icon' onClick={onOpenLanguageSelect}/>
                </button>
            
                {/*sign in and register buttons*/}
                <Link className='website-header-sign-in' to='/signin'>
                    <span className='website-header-text-gradient'>Sign in</span>
                </Link>
                <Link className='website-header-register' to='/register'
                    onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                    <div className='website-header-register-background' style={{filter: onHover}}/>
                    <span className='website-header-register-text'>Register</span>
                </Link>
                
                <div className='website-header-quicklink-box-space'/> {/*space at the end for scrolling at the nav sidebar*/}
            </nav>

            {/*alternative sign in and register button for mobile nav sidebar, staying at the default position*/}
            <Link className='website-header-sign-in-alt' to='/login'>
                <span className='website-header-text-gradient'>Sign in</span>
            </Link>
            <Link className='website-header-register-alt' to='/register'
                onMouseEnter={() => setOnHoverAlt('brightness(0.75)')} onMouseLeave={() => setOnHoverAlt('brightness(1)')}>
                <div className='website-header-register-background' style={{filter: onHoverAlt}}/>
                <span className='website-header-register-text'>Register</span>
            </Link>

            {/*scroll indicator*/}
            <div className='website-header-scroll-indicator' style={{width: `${scrollProgress}%`}}/>
            {/*the width is calculated by the scrollProgress variable and defines the width of the bar*/}

        </header>
    );
};

export default WebsiteHeader;