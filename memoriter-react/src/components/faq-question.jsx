import '../styles/faq.css';
import { useState, useEffect, useRef } from 'react';

const FaqQuestion = ({ question, onOpenQuestion }) => {

    const answer = useRef(null); //reference to the answer text

    const [answerHeight, setAnswerHeight] = useState(0); //gets height of the answer text

    useEffect(() => { //useEffect is needed to fix an issue where the value cannot is read before the component renderes, resulted in an error
        setAnswerHeight(answer.current.clientHeight); //defines the height
    }, []);

    const [open, setOpen] = useState('20px'); //height of container
    const [answerOpen, setAnswerOpen] = useState('0'); //answer text vivibility
    const [arrowRotation, setarrowRotation] = useState(''); //rotation of the arrow on the right
    const [arrowOpacity, setArrowOpacity] = useState('1'); //opacity of the arrow on the right

    if (question.isOpen === true) { //if a question is opened the styles are changing
        if (open === '20px') { //second condition prevents infinite loop
            setOpen(`calc(${answerHeight}px + 42px)`); //height depends on answer text length
            setAnswerOpen('1');

            setArrowOpacity('0');

            setTimeout(() => { //timeout used for animation, time in ms
                setarrowRotation('rotate(225deg)');
                setArrowOpacity('1');
            }, 400);
        };
    } else { //if a question is closed the styles are changing back
        if (open !== '20px') { //second condition prevents infinite loop
            setOpen('20px');
            setAnswerOpen('0');

            setArrowOpacity('0');

            setTimeout(() => { //timeout used for animation, time in ms
                setarrowRotation('');
                setArrowOpacity('1');
            }, 400);
        };
    };

    return (
        <div className='faq-question' style={{height: open}} onClick={() => onOpenQuestion(question.question)}>

            <h3 className='faq-question-question'>{question.question}</h3>
            <p className='faq-question-answer' ref={answer} style={{opacity: answerOpen}}>{question.answer}</p>

            <div className='faq-question-open' style={{transform: arrowRotation, opacity: arrowOpacity}}/> {/*arrow at the top right*/}

        </div>
    );
}

export default FaqQuestion;