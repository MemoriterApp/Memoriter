import '../../styles/blog/blog-main.css';
import Test1MainImage from '../../images/blog-images/test-1/test-1-main.jpeg';
import { useNavigate } from 'react-router-dom';

const BlogMain = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const blogs = [ //variable for listing all blog articles/posts
        {
            tag: 'Test',
            date: 'none',
            title: 'Test 1',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            tag: 'Test',
            date: 'none',
            title: 'Test 2',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
        {
            tag: 'Test',
            date: 'none',
            title: 'Test 1',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            tag: 'Test',
            date: 'none',
            title: 'Test 2',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        }
    ];

    return (
        <div className='blog-main'>

                {/*four newest blog articles*/}
                <div className='blog-main-new-blog-container'>
                    {blogs.slice(0, 2).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            <p>{blog.tag}</p>
                            <p style={{marginTop: '-35px', textAlign: 'right'}}>{blog.date}</p>
                            {blog.mainImage}
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    ))}
                </div>

                <div className='blog-main-new-blog-container'>
                    {blogs.slice(2, 4).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title} onClick={() => navigate(blog.link)}>
                            <p>{blog.tag}</p>
                            <p style={{marginTop: '-35px', textAlign: 'right'}}>{blog.date}</p>
                            {blog.mainImage}
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    ))}
                </div>

            </div>
    );
}

export default BlogMain;