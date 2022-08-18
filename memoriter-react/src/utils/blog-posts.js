/*The content of this file is an array with all blog posts, stored as objects, to function as links to the different posts.
The list is used by the blog main component.
If a new post is created, the link must be put in here or the post will not be shown on the blog page*/

import ExampleBlogPost from '../components/blog/blog-posts/example-blog-post';
import exampleBlogPostImage from '../images/blog/example-blog-post/example-blog-post.jpeg';
import ExampleBlogPosts from '../components/blog/blog-posts/example-blog-posts';

const blogs = [ //variable for listing all blog posts
    {
        topic: 'Miscellaneous', //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
        date: 'August 17th, 2022', //date of publication (syntax: August 17th, 2022)
        dateShortened: 'Aug. 17, 2022', //short form of date of publication (syntax: Aug. 17, 2022)
        author: 'Simon Hubert', //your name
        title: 'Example Blog Post', //title of the post
        description: //small description of the content of the posts
            'This post is an example placeholder blog page. It will be replaced by the first real blog post.',
        content: <ExampleBlogPost/>, //main part with content of the post
        image: <img src={exampleBlogPostImage} alt='example-blog-post'/>, //image which is shown with the blog page link, should be 16:9 and named after title (camelCase for file name, kebab-case for alt)
        link: 'example-blog-post', //url for the post (is supposed to be a syntax-corrected (kebab-case) version of the title (or a part of it))
        linkedBlogs: ['Example Blog Post'] //blog posts you want to link at the bottom of the text, write titles in an array (three posts is optimal)
    },
    {
        topic: 'Miscellaneous', //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
        date: 'August 17th, 2022', //date of publication (syntax: August 17th, 2022)
        dateShortened: 'Aug. 17, 2022', //short form of date of publication (syntax: Aug. 17, 2022)
        author: 'Simon Hubert', //your name
        title: 'Example Blog Postssssssss', //title of the post
        description: //small description of the content of the posts
            'This post is an example placeholder blog page. It will be replaced by the first real blog post.',
        content: <ExampleBlogPosts/>, //main part with content of the post
        image: <img src={exampleBlogPostImage} alt='example-blog-post'/>, //image which is shown with the blog page link, should be 16:9 and named after title (camelCase for file name, kebab-case for alt)
        link: 'example-blog-posts', //url for the post (is supposed to be a syntax-corrected (kebab-case) version of the title (or a part of it))
        linkedBlogs: ['Example Blog Post'] //blog posts you want to link at the bottom of the text, write titles in an array (three posts is optimal)
    }
];

export default blogs;