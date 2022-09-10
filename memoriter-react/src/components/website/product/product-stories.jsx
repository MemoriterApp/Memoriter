import { useState } from 'react';

const ProductStories = () => {

    const stories = [ //array with all story data
        {
            number: 0,
            author: 'Placeholder',
            quote: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
            number: 1,
            author: 'Placeholder',
            quote: 'no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
        },
        {
            number: 2,
            author: 'Placeholder',
            quote: 'accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        },
    ];

    const [number, setNumber] = useState(Math.floor(Math.random() * stories.length)); //number of the currently shown story (position in the array), is random on page render

    const [textAreaAnimation, setTextAreaAnimation] = useState('1'); //value used for the animation on next or previous story
    const [dotAnimation, setDotAnimation] = useState('var(--color-highlight-gradient-green)');

    function previousStory() { //function for switching to previous story
        setTextAreaAnimation('0'); //fade out effect
        setTimeout(() => {setTextAreaAnimation('1')}, 400); //fade in effect

        setDotAnimation('var(--color-hover)'); //dot fade out
        setTimeout(() => {setDotAnimation('var(--color-highlight-gradient-green)')}, 400); //dot fade in
        
        setTimeout(() => { //timeout needed for correctly executed animation
            if (number === 0) { //if the first story is shown it switches to the last one
                setNumber(stories.length - 1);
            } else { //else it switches to the previous one
                setNumber(number - 1);
            };
        }, 400);
    };

    function nextStory() { //function for switching to next story
        setTextAreaAnimation('0'); //fade out effect
        setTimeout(() => {setTextAreaAnimation('1');}, 400); //fade in effect

        setDotAnimation('var(--color-hover)'); //dot fade out
        setTimeout(() => {setDotAnimation('var(--color-highlight-gradient-green)')}, 400); //dot fade in
        
        setTimeout(() => { //timeout needed for correctly executed animation
            if (number === stories.length - 1) { //if the first story is shown it switches to the last one
                setNumber(0);
            } else { //else it switches to the previous one
                setNumber(number + 1);
            };
        }, 400);
    };

    function chosenStory(story) { //function for switching to the story of the clicked dot
        setTextAreaAnimation('0'); //fade out effect
        setTimeout(() => {setTextAreaAnimation('1');}, 400); //fade in effect

        setDotAnimation('var(--color-hover)'); //dot fade out
        setTimeout(() => {setDotAnimation('var(--color-highlight-gradient-green)')}, 400); //dot fade in
        
        setTimeout(() => {setNumber(story.number)}, 400); //timeout needed for correctly executed animation
    };

    return (
        <section className='product-stories'>
            <div className='product-stories-textarea'> {/*the values from the array are used here*/}
                <article style={{opacity: textAreaAnimation, transition: 'opacity 400ms'}}> {/*style used for animation*/}
                    <p className='product-stories-textarea-quote'>{stories[number].quote}</p>
                    <p className='product-stories-textarea-author'>- {stories[number].author}</p>  
                </article>
            </div>

            {/*buttons for switching to next or previous*/}
            <button className='product-stories-arrow-left' onClick={previousStory}/>
            <button className='product-stories-arrow-right' onClick={nextStory}/>

            {/*the bar of dots at the bottom for selecting a story*/}
            <div className='product-stories-dots'>
                {stories.map((story) => (
                    story.number === number? ( //dot for the current story is highlighted
                        <div className='product-stories-dot' key={story.number} style={{background: dotAnimation}}/>
                    ) : (
                        <div className='product-stories-dot' key={story.number} onClick={() => chosenStory(story)}/>
                    )
                ))}
            </div>
        </section>
    );
};

export default ProductStories;