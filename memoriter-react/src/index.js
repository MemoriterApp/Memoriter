//css file imports go all here
import './index.css';

import './styles/website/wrapper/website-header.css';
import './styles/website/wrapper/website-footer.css';
import './styles/website/product/product-banner.css';
import './styles/website/product/product-main.css';
import './styles/website/product/product-stories.css';
import './styles/website/about/about-main.css';
import './styles/website/blog/blog-main.css';
import './styles/website/blog/blog-sidebar.css';
import './styles/website/blog/blog-post-header.css';
import './styles/website/blog/blog-post-main.css';
import './styles/website/blog/blog-post-footer.css';
import './styles/website/download/download-main.css';
import './styles/website/download/download-desktop.css';
import './styles/website/download/download-mobile.css';
import './styles/website/releases/releases-main.css';
import './styles/website/releases/current-release.css';
import './styles/website/releases/old-release.css';
import './styles/website/legal.css';
import './styles/website/faq.css';
import './styles/website/newsletter/newsletter.css';
import './styles/website/newsletter/newsletter-unsubscribe.css';
import './styles/website/page-not-found.css';

import './styles/sign-in/sign-in-header.css';
import './styles/sign-in/sign-in-main.css';
import './styles/sign-in/sign-in-password-reset.css';

import './styles/website/wrapper/cookie-banner/cookie-banner.css';
import './styles/website/wrapper/cookie-banner/cookie-settings.css';
import './styles/window-size-alert.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render( //this renders the react app
  <BrowserRouter> {/*routing component*/}
    <App/> {/*the react app*/}
  </BrowserRouter>,
  document.getElementById('root')
);