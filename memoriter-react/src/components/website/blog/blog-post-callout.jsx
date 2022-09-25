import lightBulbIcon from '../../../images/icons/light-bulb-icon.svg';

const BlogPostCallout = ({ children }) => {
    return (
        <p className='blog-post-main-callout'>
            <img src={lightBulbIcon} alt='light-bulb-icon'/>
            <span>{children}</span>
        </p>
    );
}

export default BlogPostCallout;