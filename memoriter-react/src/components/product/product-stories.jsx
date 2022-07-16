import '../../styles/product/product-stories.css';
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

    const [number, setNumber] = useState(Math.floor(Math.random() * 3)); //number of the currently shown story (position in thr array), is random on page render

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
            <div className='product-stories-textarea'> {/*the values from the array are used here*/}
                    <p className='product-stories-textarea-quote'>{stories[number].quote}</p>
                    <p className='product-stories-textarea-author'>- {stories[number].author}</p>   
            </div>

            {/*buttons for switching to next or previous*/}
            <button className='product-stories-arrow-left' onClick={previousStory}/>
            <button className='product-stories-arrow-right' onClick={nextStory}/>

            {/*the bar of dots at the bottom for selecting a story*/}
            <div className='product-stories-dots'>
                {stories.map((story) => (
                    story.number === number? (
                        <div className='product-stories-dot' key={story.number} style={{background: 'linear-gradient(45deg, rgba(35, 170, 170, 1), rgba(40, 185, 125, 1))'}}/>
                    ) : (
                        <div className='product-stories-dot' key={story.number} onClick={() => setNumber(story.number)}/>
                    )
                ))}
            </div>
        </div>
    );
}

export default ProductStories;