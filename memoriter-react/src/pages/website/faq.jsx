import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import FaqQuestion from '../../components/website/faq-question';
import { useState } from 'react';

const Faq = () => {

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
    };

    return (
        <WebsiteWrapper
            title='FAQ'
            description='Frequently asked questions about the Memoriter app.'
        >

            {/*main body*/}
            <section className='faq-main'>

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

            </section>
            
        </WebsiteWrapper>
    );
}

export default Faq;