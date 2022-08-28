import Head from '../../components/head';
import ProductHeader from '../../components/website/product/product-header';
import FaqQuestion from '../../components/faq-question';
import ProductFooter from '../../components/website/product/product-footer';
import CookieBanner from '../../components/website/cookie-banner/cookie-banner';
import CookieSettings from '../../components/website/cookie-banner/cookie-settings';
import Backdrop from '../../components/backdrop';
import WindowSizeAlert from '../../components/window-size-alert';
import { useState } from 'react';

const Faq = () => {

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

    const [questions, setQuestions] = useState([ //array with all questions with answers
        //Sub Heading
        {
            question: 'Question 1',
            answer: 'Answer 1',
            isOpen: false
        },
        {
            question: 'Question 2',
            answer: 'Answer 2',
            isOpen: false
        },
        {
            question: 'Question 3',
            answer: 'Answer 3',
            isOpen: false
        },
        //Sub Heading
        {
            question: 'Question 4',
            answer: 'Answer 4',
            isOpen: false
        },
        {
            question: 'Question 5',
            answer: 'Answer 5',
            isOpen: false
        },
        {
            question: 'Question 6',
            answer: 'Answer 6',
            isOpen: false
        }
    ]);

    function openQuestion(openedQuestion) { //function is called when a question is clicked
        setQuestions((questions) => questions.map((question) => //question array is changed
            question.question === openedQuestion && !question.isOpen ? { 
                ...question, isOpen: true //clicked question opens if it is closed
            } : question.question === openedQuestion && question.isOpen ? {
                ...question, isOpen: false //clicked question closes if it is open
            } : {
                ...question, isOpen: false //all other questions are closing, only one can be opened at the same time
            }
        ))
    }

    return (
        <>

            {/*Head*/}
            <Head title='FAQ' description='Frequently asked questions about the Memoriter app.'/>

            {/*header*/}
            <ProductHeader/>

            {/*main body*/}
            <div className='faq-main'>

                <h1 className='faq-main-header'>Frequently Asked Questions</h1>

                <h2 className='faq-main-sub-heading'>Sub Heading</h2>
                {/*displays a list for a section of questions*/}
                {questions.slice(0, 3).map((question) => (
                    <FaqQuestion key={question.question} question={question} onOpenQuestion={openQuestion}/>
                ))}

                <h2 className='faq-main-sub-heading'>Sub Heading</h2>
                {/*displays a list for a section of questions*/}
                {questions.slice(3, 6).map((question) => (
                    <FaqQuestion key={question.question} question={question} onOpenQuestion={openQuestion}/>
                ))}

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

export default Faq;