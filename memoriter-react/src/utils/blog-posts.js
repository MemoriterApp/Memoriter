/*The content of this file is an array with all blog posts, stored as objects, to function as links to the different posts.
The list is used by the blog main component.
If a new post is created, the link must be put in here or the post will not be shown on the blog page*/

import Test1MainImage from '../images/blog-images/test-1/test-1-main.jpeg';

const blogs = [ //variable for listing all blog posts
    {
        topic: 'Company', //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
        date: 'none', //date of publication
        title: 'Test 1', //title of the post
        description: //small description of the content of the posts
            'A test page during developmentdevelopment development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development',
        mainImage: <img src={Test1MainImage} alt='test-1-main'/>, //image which is shown with the blog page link, should be 16:9
        link: 'test-1' //url for the post (is supposed to be a syntax-corrected (kebab-case) version of the title (or a part of it))
    },
        {
            topic: 'Technology',
            date: 'none',
            title: 'Test 2',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
        {
            topic: 'Company',
            date: 'none',
            title: 'Test 11',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            topic: 'Company',
            date: 'none',
            title: 'Test 12',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
        {
            topic: 'Productivity',
            date: 'none',
            title: 'Test 3',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Company',
            date: 'none',
            title: 'Test 4',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Miscellaneous',
            date: 'none',
            title: 'Test 5',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Productivity',
            date: 'none',
            title: 'Test 6',
            description: 'A test page during development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Productivity',
            date: 'none',
            title: 'Test 7',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Company',
            date: 'none',
            title: 'Test 8',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Company',
            date: 'none',
            title: 'Test 9',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },{
            topic: 'Company',
            date: 'none',
            title: 'Test 10',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-2'
        },
    ];

export default blogs;