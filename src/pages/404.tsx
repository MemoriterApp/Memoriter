import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/404.css';
import memoriterLogoWhite from '../images/memoriter-logo-white.svg';
import memoriterLogoBlack from '../images/memoriter-logo-black.svg';

// this page is shown when no other page can be rendered

const PageNotFound: FC = (): React.ReactElement => {
  const [onHover, setOnHover] = useState<string>('brightness(1)'); // variable for the hover effect for the get started button

  const theme: string = useSelector((state: any) => state.theme.value); // current light or dark mode icon based on theme

  return (
    <>
      {/* container with content */}
      <main className={'page-not-found'}>
        {/* large question mark next to the text */}
        <section className={'page-not-found-question-mark'}>?</section>

        {/* extra div is important for layout */}
        <section>
          {/* logo above the content */}
          <img
            className={'page-not-found-logo'}
            src={theme === 'dark' ? memoriterLogoWhite : memoriterLogoBlack}
            alt='Memoriter'
          />
          {/* text */}
          <h1>Page Not Found!</h1>
          <p>
            This URL does not match any page. Please use another link or go back to an existing
            page.
          </p>

          {/* button redirects to product page */}
          <Link
            className={'page-not-found-button'}
            to='/'
            onMouseEnter={() => setOnHover('brightness(0.75)')}
            onMouseLeave={() => setOnHover('brightness(1)')}
          >
            {/* the onMouseEnter and -Leave is for the fade effect on hover which was not possible in CSS */}
            Return to Website!
            <div className={'page-not-found-button-background'} style={{ filter: onHover }} />
          </Link>
        </section>
      </main>
    </>
  );
};
export default PageNotFound;
