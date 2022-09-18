import twitterIcon from '../../../images/icons/twitter-icon.svg';
import facebookIcon from '../../../images/icons/facebook-icon.svg';
import whatsappIcon from '../../../images/icons/whatsapp-icon.svg';
import emailIcon from '../../../images/icons/newsletter-icon.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPostHeader = ({ title, date, author, topic }) => {

    const [wordCount, setWordCount] = useState(0); //(slightly inaccurate) number of words of the main part, used for reading time calculation

    useEffect(() => { //useefect triggers if the word count changes, needed to auto set the reading time
        setWordCount(sessionStorage.getItem('current-blog-word-count')); //sets the word count to a value from session storage
    }, [wordCount]);

    return (
        <div>
            
            {/*header with date of publication and links back to the blog page, gets the data by the general blog post data variables as properties*/}
            <Link className='blog-post-header-all-posts' to='/blog'>&#129044; All posts</Link> {/*&#129044; is a unicode arrow symbol*/}
            
            <div className='blog-post-header-content'>

                <p className='blog-post-header-data'>
                    Published on {date} in <Link
                        className='blog-post-header-data-link'
                        to={`/blog/topic/${topic.replace(/([A-Z])/g, '$1').toLowerCase()}`}
                        //.replace(/([A-Z])/g, '$1').toLowerCase() changes the first letter of the topic from capitalized to lower case letter
                    >{topic}</Link>
                </p>

                <h1 className='blog-post-header-title'>{title}</h1> {/*heading with blog title*/}
                <p className='blog-post-header-author'>by {author}</p> {/*who has written the post*/}

            </div>

            {/*average reading time (*is calculated with the word count)*/}
            <p className='blog-post-header-reading-time'>
                 {(wordCount / 250).toFixed()} {(wordCount / 250).toFixed() === '1' ? ('minute') : ('minutes')} read</p>
            {/*250 is an estimation for average words read per minute, .toFixed() rounds the number, the condition checks if the singular or plural of minute needs to be displayed*/}

            {/*share links, the links are using the title variable and the current url (window.location)*/}
            <div className='blog-post-header-share'>
                <p>Share this post</p>
                <a className='blog-post-header-share-circle' style={{left: '0'}}
                    href={`https://twitter.com/intent/tweet?url=${window.location}/&text=${title}`} target='_blank' rel='noreferrer'>
                    <img className='blog-post-header-share-icon'
                        src={twitterIcon} alt='twitter-icon'/>
                </a>
                <a className='blog-post-header-share-circle' style={{left: '45px'}}
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location}/`} target='_blank' rel='noreferrer'>
                    <img className='blog-post-header-share-icon' style={{marginTop: '-1px'}}
                        src={facebookIcon} alt='facebook-icon'/>
                </a>
                <a className='blog-post-header-share-circle' style={{left: '90px'}}
                    href={`https://api.whatsapp.com/send?text=${title}%0a${window.location}`} target='_blank' rel='noreferrer'>
                    <img className='blog-post-header-share-icon'
                        src={whatsappIcon} alt='twitter-icon'/>
                </a>
                <a className='blog-post-header-share-circle' style={{left: '135px'}}
                    href={`mailto:?subject=${title}&body=${title}%0A${window.location}`} target='_blank' rel='noreferrer'>
                    <img className='blog-post-header-share-icon'
                        src={emailIcon} alt='email-icon'/>
                </a>
            </div>

        </div>
    );
}

export default BlogPostHeader;