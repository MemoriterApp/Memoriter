import { useState, useEffect, useRef } from 'react';

const ExampleBlogPosts = () => {

    const blogPostMain = useRef(null); //reference to the content

    const [postContent, setPostContent] = useState(''); //gets the text of the post

    useEffect(() => { //useEffect is needed to fix an issue where the value cannot is read before the component renderes, resulted in an error
        setPostContent(blogPostMain.current.innerText); //counts the words of the text (every word in the <article/> tag)
    }, []);

    sessionStorage.setItem('current-blog-word-count', postContent.split(' ').length); //calculates number of words and saves it to session storage on page load

    return (
        <article ref={blogPostMain}>

            <p>
                This post is an example placeholder blog page. It will be replaced by the first real blog post.
            </p>
            <a href='https://www.lipsum.com/feed/html' target='_blank' rel='noreferrer'>Source of the following text</a>
            <h2>Lorem Ipsum</h2>

        </article>
    );
}

export default ExampleBlogPosts;