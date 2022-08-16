import '../../styles/blog/blog-main.css';
import Test1MainImage from '../../images/blog-images/test-1/test-1-main.jpeg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogMain = ({ filter }) => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const blogs = [ //variable for listing all blog articles/posts
        {
            category: 'Company',
            date: 'none',
            title: 'Test 1',
            description: 'A test page during development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            category: 'Technology',
            date: 'none',
            title: 'Test 2',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
        {
            category: 'Company',
            date: 'none',
            title: 'Test 11',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            category: 'Company',
            date: 'none',
            title: 'Test 12',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
        {
            category: 'Productivity',
            date: 'none',
            title: 'Test 3',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Company',
            date: 'none',
            title: 'Test 4',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Miscellaneous',
            date: 'none',
            title: 'Test 5',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Productivity',
            date: 'none',
            title: 'Test 6',
            description: 'A test page during development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Productivity',
            date: 'none',
            title: 'Test 7',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Company',
            date: 'none',
            title: 'Test 8',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Company',
            date: 'none',
            title: 'Test 9',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            category: 'Company',
            date: 'none',
            title: 'Test 10',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
    ];

    const [loadedBlogs, setLoadedBlogs] = useState(8); //number of blog articles shown before clicking on the load more button

    return (
        <div className='blog-main'>

                {/*four newest blog articles*/}
                <div className='blog-main-new-blog-container'>
                    {blogs.filter((blog) => filter !== 'Latest' ? blog.category === filter : blog.category !== filter).slice(0, 2).map((blog) => (
                        //gets the first two objects from the blogs array, is filtered when a filter (e.g. 'company') is active
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p style={{lineHeight: '1rem'}}>{blog.category}</p>
                            <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                            {blog.mainImage}
                            
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        
                        </div>
                    ))}
                </div>
                <div className='blog-main-new-blog-container'>
                    {blogs.filter((blog) => filter !== 'Latest' ? blog.category === filter : blog.category !== filter).slice(2, 4).map((blog) => (
                        //gets the objects three to four from the blogs array, is filtered when a filter (e.g. 'company') is active
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p style={{lineHeight: '1rem'}}>{blog.category}</p>
                            <p style={{lineHeight: '1rem', marginTop: '-2.1rem', textAlign: 'right'}}>{blog.date}</p>
                            
                            {blog.mainImage}
                            
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    ))}
                </div>

                {/*older blog articles (different, more compact style)*/}
                <div>
                    {blogs.filter((blog) => filter !== 'Latest' ? blog.category === filter : blog.category !== filter).slice(4, loadedBlogs).map((blog) => (
                        //gets more objects from the blogs array, is filtered when a filter (e.g. 'company') is active
                        <div className='blog-main-old-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            
                            <p className='blog-main-old-blog-outside'>{blog.category}</p>
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
                {loadedBlogs <= blogs.filter((blog) => filter !== 'Latest' ? blog.category === filter : blog.category !== filter).length - 1 ? (
                    <button className='blog-main-button' onClick={() => setLoadedBlogs(loadedBlogs + 8)}>Load More...</button>) : (<div/>)
                }

            </div>
    );
}

export default BlogMain;