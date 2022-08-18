/*The content of this file is an array with all blog posts, stored as objects, to function as links to the different posts.
The list is used by the blog main component.
If a new post is created, the link must be put in here or the post will not be shown on the blog page*/

import exampleBlogPost from '../images/blog/example-blog-post/example-blog-post.jpeg';

const blogs = [ //variable for listing all blog posts
    {
        topic: 'Miscellaneous', //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
        date: 'Aug. 17, 2022', //date of publication (syntax: Aug. 17, 2022)
        title: 'Example Blog Post', //title of the post
        description: //small description of the content of the posts
            'This post is an example placeholder blog page. It will be replaced by the first real blog post.',
        mainImage: <img src={exampleBlogPost} alt='example-blog-post'/>, //image which is shown with the blog page link, should be 16:9 and named after title (camelCase for file name, kebab-case for alt)
        link: 'example-blog-post' //url for the post (is supposed to be a syntax-corrected (kebab-case) version of the title (or a part of it))
    }
];

export default blogs;