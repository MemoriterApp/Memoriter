import '../../styles/blog/blog-main.css';
import Test1MainImage from '../../images/blog-images/test-1/test-1-main.jpeg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogMain = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const blogs = [ //variable for listing all blog articles/posts
        {
            tag: 'Test',
            date: 'none',
            title: 'Test 1',
            description: 'A test page during development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        }
    ];

    const [loadedBlogs, setLoadedBlogs] = useState(8); //number of blog articles shown before clicking on the load more button

    return (
        <div className='blog-main'>

                {/*four newest blog articles*/}
                <div className='blog-main-new-blog-container'>
                    {blogs.slice(0, 2).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p style={{lineHeight: '1rem'}}>{blog.tag}</p>
                            <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                            {blog.mainImage}
                            
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        
                        </div>
                    ))}
                </div>
                <div className='blog-main-new-blog-container'>
                    {blogs.slice(2, 4).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p style={{lineHeight: '1rem'}}>{blog.tag}</p>
                            <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                            {blog.mainImage}
                            
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    ))}
                </div>

                {/*older blog articles (different, more compact style)*/}
                <div>
                    {blogs.slice(4, loadedBlogs).map((blog) => (
                        <div className='blog-main-old-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p className='blog-main-old-blog-outside'>{blog.tag}</p>
                            <p className='blog-main-old-blog-outside' style={{marginTop: '-35px', textAlign: 'right'}}>{blog.date}</p>
                            
                            <div style={{display: 'flex', gap: '20px'}}>

                                <div className='blog-main-old-blog-box'>
                                    <h2>{blog.title}</h2>
                                    <p>{blog.description}</p>
                                </div>

                                {blog.mainImage}

                            </div>

                        </div>
                    ))}
                </div>
                
                {/*load more button, onClick just adds eight to the number of the maximum of shown blogs. The button is just shown if necessary.*/}
                {loadedBlogs <= blogs.length - 1 ? (
                    <button className='blog-main-button' onClick={() => setLoadedBlogs(loadedBlogs + 8)}>Load More...</button>) : (<div/>)
                }

            </div>
    );
}

export default BlogMain;