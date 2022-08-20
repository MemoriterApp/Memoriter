import lightBulbIcon from '../../../images/icons/light-bulb-icon.svg';
import exampleBlogPost from '../../../images/blog/example-blog-post/example-blog-post.jpeg';
import BlogPostEmbeddedVideo from '../blog-post-embedded-video';
import BlogPostCodeBlock from '../blog-post-code-block';
import BlogPostInlineCode from '../blog-post-inline-code';
import { useState, useEffect, useRef } from 'react';

const ExampleBlogPost = () => {

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
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum purus magna, a pulvinar odio condimentum quis. In varius posuere ligula nec maximus. Proin blandit tincidunt euismod. Vivamus dapibus tortor est, at varius ligula pretium convallis. Sed ligula dolor, feugiat non purus non, faucibus tristique enim. Aenean fermentum dictum risus, id sollicitudin turpis accumsan ut. In tincidunt tincidunt nisl, non pharetra metus rhoncus sed. Sed egestas pellentesque urna in volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pellentesque ante convallis turpis auctor sagittis eu in nibh. Aliquam nec ullamcorper est. Aliquam a turpis sodales, lobortis ligula vitae, aliquam nulla. Nam vel massa sit amet nisl tempus vehicula. Nunc est elit, gravida eleifend quam ut, pretium dapibus dui. Suspendisse vitae leo eu elit ultricies sagittis.
            </p>
            <p>
                Praesent malesuada accumsan ligula at bibendum. Cras maximus massa id leo accumsan facilisis. Donec auctor laoreet tellus vitae volutpat. Curabitur vitae ultricies est. Nulla eu ultricies massa, sit amet molestie erat. Pellentesque ultrices nulla ex, id consequat nunc aliquet eget. Nunc faucibus massa quis rhoncus gravida.
            </p>

            <figure>
                <img src={exampleBlogPost} alt='placeholder'/>
                <figcaption>Placeholder Image</figcaption>
            </figure>

            <p>
                Suspendisse efficitur tempus mattis. Quisque sagittis, nisl semper vestibulum condimentum, felis sem facilisis ligula, a faucibus lorem libero non magna. Aliquam accumsan quam eget vestibulum cursus. Pellentesque nec lectus auctor, suscipit ligula id, posuere ex. Aenean pharetra arcu eu purus laoreet pretium eu vel magna. Mauris bibendum nunc eget lectus commodo egestas. Nunc vitae lacus ligula. Mauris mollis dapibus augue non rhoncus. Nullam sodales mauris id sapien aliquam blandit. Curabitur ut est id purus placerat dignissim non sodales dolor. Ut condimentum justo eu ipsum finibus, vitae dictum turpis ornare. Nunc eros augue, feugiat sed dui in, pellentesque faucibus nulla. Cras lobortis iaculis aliquam. Mauris vel nulla ornare metus iaculis volutpat nec id nibh.
            </p>
            <p>
                Donec vel tempus magna. Nulla et pellentesque odio. Etiam dictum vulputate ullamcorper. Etiam mattis rhoncus venenatis. Quisque in imperdiet ligula. Pellentesque id ligula massa. Nullam semper, metus non laoreet eleifend, quam tellus faucibus nisi, vel vestibulum odio neque sed odio. Etiam suscipit in metus at viverra. Nulla finibus porta nunc quis cursus. Praesent porttitor ut neque ut rhoncus. Aenean vel tincidunt augue, et posuere ipsum. Morbi facilisis consequat elit, id varius ipsum porta a.
            </p>

            <figure>
                <BlogPostEmbeddedVideo videoId='WXuK6gekU1Y'/>
                <figcaption>Embedded YouTube Video</figcaption>
            </figure>

            <p>
                Phasellus volutpat non dolor at ullamcorper. Ut tempor tortor diam, in dictum diam sagittis et. Sed vitae dui mauris. Cras arcu turpis, venenatis sed consequat elementum, cursus in enim. Mauris luctus nulla tincidunt dignissim molestie. Pellentesque bibendum auctor risus, porta finibus tellus viverra in. Nunc scelerisque lorem quis fermentum iaculis. Suspendisse imperdiet, tortor nec iaculis ullamcorper, nunc mauris aliquam neque, in ultrices nunc nibh eu lectus. Ut mauris ipsum, fermentum nec tristique vitae, consectetur vestibulum tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed mi nulla, dapibus sit amet purus eget, tincidunt dapibus arcu. Nullam dignissim lacus ac sem pellentesque lacinia.
            </p>
            
            <h3>Example Callout</h3>

            <p className='blog-post-main-callout'>
                <img src={lightBulbIcon} alt='light-bulb-icon'/>
                <span>Phasellus volutpat non dolor at ullamcorper.</span>
            </p>

            <h3>Example Code</h3>

            <BlogPostCodeBlock>{[
                'const pi = 3.14;',
                'console.log(pi);',
                'return(<div>Hello!</div>);'
            ]}</BlogPostCodeBlock>

            <div>It also works inline: <BlogPostInlineCode>{'return 3.14;'}</BlogPostInlineCode></div>

        </article>
    );
}

export default ExampleBlogPost;