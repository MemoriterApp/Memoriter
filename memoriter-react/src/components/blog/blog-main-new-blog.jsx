import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogMainNewBlog = ({ blog }) => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const [onHoverImage, setOnHoverImage] = useState('');
    const [onHoverTitle, setOnHoverTitle] = useState('');

    function onHover() {
        if (onHoverImage === '') {
            setOnHoverImage('brightness(0.75)');
            setOnHoverTitle('rgba(200, 200, 200, 1)');
        } else {
            setOnHoverImage('');
            setOnHoverTitle('');
        }
        
    };

    return (
        <div className='blog-main-new-blog' onClick={() => navigate(blog.link)}
            onMouseEnter={onHover} onMouseLeave={onHover}>

            <p>{blog.tag}</p>
            <p style={{marginTop: '-35px', textAlign: 'right'}}>{blog.date}</p>
            <span style={{filter: onHoverImage}}>{blog.mainImage}</span>
            <h2 style={{color: onHoverTitle}}>{blog.title}</h2>
            <p>{blog.description}</p>

        </div>
    );
}

export default BlogMainNewBlog;