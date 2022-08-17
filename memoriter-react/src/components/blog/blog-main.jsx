import '../../styles/blog/blog-main.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogs from '../../utils/blog-posts';

const BlogMain = ({ topic }) => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const [loadedBlogs, setLoadedBlogs] = useState(8); //number of blog posts shown before clicking on the load more button

    return (
        <div className='blog-main'>

            {/*four newest blog posts, divided in to two parts for the layout*/}
            <div className='blog-main-new-blog-container'>
                {blogs.filter((blog) => topic !== 'Latest' ? blog.topic === topic : blog.topic !== topic).slice(0, 2).map((blog) => (
                    //gets the first two objects from the blogs array, is filtered when a topic (e.g. 'company') is set
                    <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(`/blog/${blog.link}`)}>
                            
                        <p style={{lineHeight: '1rem'}}>{blog.topic}</p>
                        <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                        {blog.mainImage}
                            
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        
                    </div>
                ))}
            </div>
            <div className='blog-main-new-blog-container'>
                {blogs.filter((blog) => topic !== 'Latest' ? blog.topic === topic : blog.topic !== topic).slice(2, 4).map((blog) => (
                    //gets the objects three to four from the blogs array, is filtered when a topic (e.g. 'company') is set
                    <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(`/blog/${blog.link}`)}>
                            
                        <p style={{lineHeight: '1rem'}}>{blog.topic}</p>
                        <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                        {blog.mainImage}
                            
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                    </div>
                ))}
            </div>

            {/*older blog posts (different, more compact style)*/}
            <div>
                {blogs.filter((blog) => topic !== 'Latest' ? blog.topic === topic : blog.topic !== topic).slice(4, loadedBlogs).map((blog) => (
                    //gets more objects from the blogs array, is filtered when a topic (e.g. 'company') is set
                    <div className='blog-main-old-blog' key={blog.title} onClick={() => navigate(`/blog/${blog.link}`)}>
                            
                        <p className='blog-main-old-blog-outside'>{blog.topic}</p>
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
            {loadedBlogs <= blogs.filter((blog) => topic !== 'Latest' ? blog.topic === topic : blog.topic !== topic).length - 1 ? (
                <button className='blog-main-button' onClick={() => setLoadedBlogs(loadedBlogs + 8)}>Load More...</button>) : (<div/>)
            }

        </div>
    );
}

export default BlogMain;