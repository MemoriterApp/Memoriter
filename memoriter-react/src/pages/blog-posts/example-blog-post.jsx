import '../../styles/blog/blog-post-main.css';
import lightBulbIcon from '../../images/icons/light-bulb-icon.svg';
import exampleBlogPost from '../../images/blog/example-blog-post/example-blog-post.jpeg';
import Head from '../../components/head';
import ProductHeader from '../../components/product/product-header';
import BlogPostHeader from '../../components/blog/blog-post-header';
import ProductFooter from '../../components/product/product-footer';
import CookieBanner from '../../components/cookie-banner/cookie-banner';
import CookieSettings from '../../components/cookie-banner/cookie-settings';
import Backdrop from '../../components/backdrop';
import WindowSizeAlert from '../../components/window-size-alert';
import BlogPostCodeBlock from '../../components/blog/blog-post-code-block';
import BlogPostInlineCode from '../../components/blog/blog-post-inline-code';
import { useState } from 'react';

const ExampleBlogPost = () => {

    const [cookieSettings, setCookieSettings] = useState(false); //opens or closes cookie settings

    const [cookieSettingsAnimation, setCookieSettingsAnimation] = useState({ //animation when opening cookie settings modal
        transform: 'translate(-50%, calc(-50% - 16px))',
        opacity: '0',
    }); //styles used for the cookie settings fade in and out animation
    const [backdropAnimation, setBackdropAnimation] = useState('0'); //backdrop opacity (used for fade in and out animation)
    
    function openCookieSettings() { //function for opening the cookie settings
        document.body.style.overflow = 'hidden'; //disables page scrolling
        setCookieSettings(true);
        setTimeout(() => {
            setBackdropAnimation('1');
            setCookieSettingsAnimation({
                transform: 'translate(-50%, -50%)',
                opacity: '1'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade in effect, does not work without timeout
    };

    function closeCookieSettings() { //function for closing the cookie settings
        document.body.style.overflow = 'auto'; //re-enables page scrolling
        setTimeout(() => {setCookieSettings(false);}, 800); //timeout is needed for finishing the fade effect before closing everything
        setTimeout(() => {
            setBackdropAnimation('0');
            setCookieSettingsAnimation({
                transform: 'translate(-50%, calc(-50% - 16px))',
                opacity: '0'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade out effect, does not work without timeout
    };

    //general blog post data (used for the post header)
    const title = 'Example Blog Post'; //blog title
    const description = //small description, same as used for the overview page
        'This post is an example placeholder blog page. It will be replaced by the first real blog post.';
    const date = 'August 17th, 2022'; //date of publication (syntax: August 17th, 2022)
    const author = 'Simon Hubert'; //your name
    const topic = 'Miscellaneous'; //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
    const wordCount = 406 //count the words of the text (every word in the <article/> tag)

    return (
        <>

            {/*Head*/}
            <Head title={title} description={description}/>

            {/*header*/}
            <ProductHeader currentPage='blog'/>

            <div className='blog-post-main'>

                {/*header/blog post data (like title, author, date of publication etc.), gets the data by the general blog post data variables*/}
                <BlogPostHeader title={title} date={date} author={author} topic={topic} wordCount={wordCount}/>

                {/*main part, id does not use extra css classes in most cases, they are pre-configured*/}
                <article>
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

                    <p>It also works inline: <BlogPostInlineCode>{'return 3.14;'}</BlogPostInlineCode></p>

                </article>

            </div>

            {/*footer*/}
            <ProductFooter onOpenCookieSettings={openCookieSettings}/>

            {/*cookie banner*/}
            <CookieBanner onOpenCookieSettings={openCookieSettings}/>

            {/*cookie settings modal*/}
            {cookieSettings && <>
                <CookieSettings onAnimation={cookieSettingsAnimation} onCloseCookieSettings={closeCookieSettings}/>
                <Backdrop onFade={backdropAnimation} onClick={closeCookieSettings}/>
            </>}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default ExampleBlogPost;