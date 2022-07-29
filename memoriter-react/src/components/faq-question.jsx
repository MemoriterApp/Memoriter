import '../styles/faq.css';
import { useState } from 'react';

const FaqQuestion = ({ question, onOpenQuestion }) => {

    const [open, setOpen] = useState('20px');
    const [answerOpen, setAnswerOpen] = useState('0');
    const [arrowRotation, setarrowRotation] = useState('');
    const [arrowOpacity, setArrowOpacity] = useState('1');

    if (question.isOpen === true) {
        if (open === '20px') {
            setOpen('200px');
            setAnswerOpen('1');

            setArrowOpacity('0');

            setTimeout(() => {
                setarrowRotation('rotate(225deg)');
                setArrowOpacity('1');
            }, 400);
        };
    } else {
        if (open === '200px') {
            setOpen('20px');
            setAnswerOpen('0');

            setArrowOpacity('0');

            setTimeout(() => {
                setarrowRotation('');
                    setArrowOpacity('1');
            }, 400);
        };
    };

    return (
        <div className='faq-question' style={{height: open}} onClick={() => onOpenQuestion(question.question)}>

            <h3 className='faq-question-question'>{question.question}</h3>
            <p className='faq-question-answer' style={{opacity: answerOpen}}>{question.answer}</p>

            <div className='faq-question-open' style={{transform: arrowRotation, opacity: arrowOpacity}}/> {/*arrow at the top right*/}

        </div>
    );
}

export default FaqQuestion;