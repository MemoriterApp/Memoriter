import '../../styles/product/product-stories.css';
import { useState } from 'react';

const ProductStories = () => {

    const stories = [ //array with all stories
        {
            number: 0,
            author: 'ich',
            quote: 'Memoriter'
        },
        {
            number: 1,
            author: 'nicht ich',
            quote: 'ist'
        },
        {
            number: 2,
            author: 'du',
            quote: 'gut.'
        },
    ];

    const [number, setNumber] = useState(0); //number of the currently shown story (position in thr array)

    function previousStory() { //function for switching to previous story
        if (number === 0) { //if the first story is shown it switches to the last one
            setNumber(stories.length - 1);
        } else { //else it switches to the previous one
            setNumber(number - 1);
        };
    };

    function nextStory() { //function for switching to next story
        if (number === stories.length - 1) { //if the last story is shown it switches to the first one
            setNumber(0);
        } else { //else it switches to the next one
            setNumber(number + 1); 
        };
    };

    return (
        <div className='product-stories'>
            <div className='product-stories-textarea'>
                <p>{stories[number].quote}</p>
                <p>- {stories[number].author}</p>
            </div>

            {/*buttons for switching to next or previous*/}
            <button className='product-stories-arrow-left' onClick={previousStory}/>
            <button className='product-stories-arrow-right' onClick={nextStory}/>

            {/*the bar of dots at the bottom for selecting a story*/}
            <div className='product-stories-dots'>
                {stories.map((story) => (
                    story.number === number? (
                        <div className='product-stories-dot' style={{backgroundColor: 'green'}} key={story.number} onClick={() => setNumber(story.number)}/>
                    ) : (
                        <div className='product-stories-dot' key={story.number} onClick={() => setNumber(story.number)}/>
                    )
                ))}
            </div>
        </div>
    );
}

export default ProductStories;