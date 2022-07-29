import '../styles/faq.css';
import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductFooter from '../components/product/product-footer';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';
import FaqQuestion from '../components/faq-question';

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

    function openQuestion(openedQuestion, isOpen) {
        setQuestions((questions) => questions.map((question) => 
            question.question === openedQuestion ? { ...question, isOpen: true } : { ...question, isOpen: false }
        ))
    }

    return (
        <>

            {/*Head*/}
            <Head title='FAQ' description='Frequently asked questions about the Memoriter app.'/>

            {/*header*/}
            <ProductHeader/>

            {/*main body*/}
            <div className='faq'>

                <h1 className='faq-header'>Frequently Asked Questions</h1>

                <h2 className='faq-sub-heading'>Sub Heading</h2>
                {/*displays a list for a section of questions*/}
                {questions.slice(0, 3).map((question) => (
                    <FaqQuestion key={question.question} question={question} onOpenQuestion={openQuestion}/>
                ))}

                <h2 className='faq-sub-heading'>Sub Heading</h2>
                {/*displays a list for a section of questions*/}
                {questions.slice(3, 6).map((question) => (
                    <FaqQuestion key={question.question} question={question} onOpenQuestion={openQuestion}/>
                ))}

            </div>

            {/*footer*/}
            <ProductFooter onOpenCookieSettings={openCookieSettings}/>

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