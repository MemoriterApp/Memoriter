import React from 'react';

function TutorialSpacedRep() {
      /*Here Functions determine what text should be shown, when that button is pressed, instead of the given Text below. */
      const easy_change = () => {
        document.getElementById('title').innerHTML = 'Easy button';
        document.getElementById('text_1').innerHTML = 'This is used for answers that you can answer without thinking too hard.';
        document.getElementById('text_2').innerHTML = 'Examples:';
        document.getElementById('text_3').innerHTML = 'Q: Capital of Germany? <div> A: Berlin';
        document.getElementById('text_4').innerHTML = 'Q: What is the powerhouse of the Cell? <div>  A: The Mitochondria';
        
    }

    const ok_change = () => {
        document.getElementById('title').innerHTML = 'Correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions that you can answer, but needed some time to think about it. Your confidence in the answer is also high.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: What is 4*6.5? <div> A: 26';
        document.getElementById('text_4').innerHTML = '';
    }

    const medium_change = () => {
        document.getElementById('title').innerHTML = 'Mostly correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions where a small part of your answer is incorrect, or one of multiple correct one is incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Placeholder Text<div> A: NOTHING givven';
        document.getElementById('text_4').innerHTML = '';
    }

    const almost_change = () => {
        document.getElementById('title').innerHTML = 'Almost correct button';
        document.getElementById('text_1').innerHTML = 'This is used for close calls, where you might have just misremembered the answer.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: gfgfgfgfgfgfgfgfgfgfgff <div> Your A: fr <div> Correct A: gt ';
        document.getElementById('text_4').innerHTML = '';

    }

    const hard_change = () => {
        document.getElementById('title').innerHTML = 'Incorrect button';
        document.getElementById('text_1').innerHTML = 'Here the answer is undoubtedly incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Where do polar bears live? <div> Your A: Antarctica <div> Correct A: The Artcic';
        document.getElementById('text_4').innerHTML = '';
        
    }
    return (
    <div className='study-spaced-repetition-tutorial'>
                        {/*These are the first Texts you see when entering the tutorial popup. */}
                        <div className='tutorial-sub'>
                            <p id='title'  style={{fontSize:'28px'}}>Tutorial on Spaced Repetition buttons</p> 
                            <p id='text_1'></p>
                            <p id='text_2'>To start click on a colored button below.</p>
                            <p id='text_3'></p>
                            <p id='text_4'></p>
                        </div>

                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '-5%', background:'#0d8f52'}} onClick={easy_change}>Easy</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '17.5%', background:'#0d8f18'}} onClick={ok_change}>✔</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '40%', background:'#778f0d'}} onClick={medium_change}>mostly</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '62.5%', background:'#8f520d'}} onClick={almost_change}>close</button>

                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '85%', background:'#8f0d0d'}} onClick={hard_change}>✖</button>
                    </div>
    );
}

export default TutorialSpacedRep;