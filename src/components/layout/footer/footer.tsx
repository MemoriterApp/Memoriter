import './footer.css';
import { useState } from 'react';
import twitterIcon from '../../../images/icons/twitter-icon.svg';
import instagramIcon from '../../../images/icons/instagram-icon.svg';
import tiktokIcon from '../../../images/icons/tiktok-icon.svg';
import discordIcon from '../../../images/icons/discord-icon.svg';
import githubIcon from '../../../images/icons/github-icon.svg';

const FooterButton = () => {
  const [showExpandedFooter, setShowExpandedFooter] = useState(false);

  return (
    <>
      <button className='footer-button' onClick={() => setShowExpandedFooter(!showExpandedFooter)}>
        ?
      </button>

      {showExpandedFooter && (
        <>
          <p className='footer'>
            <a href='https://memoriter.de/releases' target='_blank' rel='noreferrer'>
              Release Notes
            </a>{' '}
            |{' '}
            <a href='https://memoriter.de/support' target='_blank' rel='noreferrer'>
              Help
            </a>{' '}
            |{' '}
            <a href='https://memoriter.de/bugs' target='_blank' rel='noreferrer'>
              Report a Bug
            </a>{' '}
            |{' '}
            <a href='https://shop-memoriter.myspreadshop.de/' target='_blank' rel='noreferrer'>
              Merchandise
            </a>{' '}
            |{' '}
            <a
              className='footer-icon'
              href='https://twitter.com/MemoriterHQ'
              target='_blank'
              rel='noreferrer'
            >
              <img src={twitterIcon} alt='twitter-icon' />
            </a>
            <a
              className='footer-icon'
              href='https://www.instagram.com/memoriter6/'
              target='_blank'
              rel='noreferrer'
            >
              <img src={instagramIcon} alt='instagram-icon' />
            </a>
            <a
              className='footer-icon'
              href='https://www.tiktok.com/@memoriterofficial'
              target='_blank'
              rel='noreferrer'
            >
              <img src={tiktokIcon} alt='tiktok-icon' />
            </a>
            <a
              className='footer-icon'
              href='https://discord.com/invite/wpdYh2CQ4H'
              target='_blank'
              rel='noreferrer'
            >
              <img src={discordIcon} alt='discord-icon' />
            </a>
            <a
              className='footer-icon'
              href='https://github.com/MemoriterApp'
              target='_blank'
              rel='noreferrer'
            >
              <img src={githubIcon} alt='github-icon' />
            </a>
          </p>
        </>
      )}
    </>
  );
};
export default FooterButton;
