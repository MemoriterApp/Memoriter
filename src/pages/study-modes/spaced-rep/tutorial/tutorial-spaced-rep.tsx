import './tutorial-spaced-rep.css';

function TutorialSpacedRep() {
    /*Here Functions determine what text should be shown, when that button is pressed, instead of the given Text below. */
    const easyChange = () => {
        document.getElementById('title').innerHTML = 'Easy button';
        document.getElementById('text_1').innerHTML = 'This is used for answers that you can answer without thinking too hard.';
        document.getElementById('text_2').innerHTML = 'Examples:';
        document.getElementById('text_3').innerHTML = 'Q: Capital of Germany? <div> A: Berlin';
        document.getElementById('text_4').innerHTML = 'Q: What is the powerhouse of the Cell? <div>  A: The Mitochondria';

    };

    const okChange = () => {
        document.getElementById('title').innerHTML = 'Correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions that you can answer, but needed some time to think about it. Your confidence in the answer is also high.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: What is 4*6.5? <div> A: 26';
        document.getElementById('text_4').innerHTML = '';
    };

    const mediumChange = () => {
        document.getElementById('title').innerHTML = 'Mostly correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions where a small part of your answer is incorrect, or one of multiple correct one is incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: What are the four main taste sensations that our taste buds can detect?<div> A: Sweet, sour, salty, and Spicy. (Incorrect: Spicy is not one of the four main taste sensations that our taste buds can detect.)';
        document.getElementById('text_4').innerHTML = '';
    };

    const almostChange = () => {
        document.getElementById('title').innerHTML = 'Almost correct button';
        document.getElementById('text_1').innerHTML = 'This is used for close calls, where you might have just misremembered the answer.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Who was the 16th President of the United States? <div> A: George Washington. (Incorrect: George Washington was the first President of the United States, but not the 16th.) ';
        document.getElementById('text_4').innerHTML = '';

    };

    const hardChange = () => {
        document.getElementById('title').innerHTML = 'Incorrect button';
        document.getElementById('text_1').innerHTML = 'Here the answer is undoubtedly incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Where do polar bears live? <div> A: Antarctica (Incorrect: Polar bears live in the Arctic, not Antarctica.)';
        document.getElementById('text_4').innerHTML = '';

    };
    return (
        <div className='study-spaced-repetition-tutorial'>
            {/*These are the first Texts you see when entering the tutorial popup. */}
            <div className='tutorial-sub'>
                <p id='title' style={{fontSize:'28px'}}>Tutorial on Spaced Repetition buttons</p>
                <p id='text_1'></p>
                <p id='text_2'>To start click on a colored button below.</p>
                <p id='text_3'></p>
                <p id='text_4'></p>
            </div>

            <button className='tutorial-spaced-repetition-buttons'
                style={{ left: '-5%', background:'#0d8f52'}} onClick={easyChange}>Easy</button>

            <button className='tutorial-spaced-repetition-buttons'
                style={{ left: '17.5%', background:'#0d8f18'}} onClick={okChange}>✔</button>

            <button className='tutorial-spaced-repetition-buttons'
                style={{ left: '40%', background:'#778f0d'}} onClick={mediumChange}>mostly</button>

            <button className='tutorial-spaced-repetition-buttons'
                style={{ left: '62.5%', background:'#8f520d'}} onClick={almostChange}>close</button>

            <button className='tutorial-spaced-repetition-buttons'
                style={{ left: '85%', background:'#8f0d0d'}} onClick={hardChange}>✖</button>
        </div>
    );
}

export default TutorialSpacedRep;