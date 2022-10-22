import { firebase } from './firebase';
import { updateDoc } from 'firebase/firestore/lite';

// This file contains the algorithm function to set the new date for the spaced repetition algorithm

// function gets the flashcard id answer type, correct answer streak, easiness factor and the last interval
export const spacedRepetition = (id, type, streak, easiness, interval) => {
    // five different answer types are possible (0-4)
    // 0 is incorrect, 1 is almost correct (with difficulties)
    // 2 is correct and 3 is easy (fast without any difficulties)

    // a conditional statement sets the new values
    if (type > 1) { // correct response
        // new condition to set the interval based on the answer streak
        if (streak === 0) { // answer streak is 0
            interval = type - 1;
        } else if (streak === 1) { // answer streak is 1
            interval = type * 2 - 1; 
        } else if (streak === 2) { // answer streak is 2
            interval = type * 3 + 1; 
        } else { // higher answer streak
            interval = Math.round((interval + type) * easiness); // interval is updated based on the easiness factor
        };

        let nextDate = new Date(); // gets current date
        nextDate.setDate(nextDate.getDate() + interval + type - 1); // updates date (for the flashcard to showagain) by the last interval and answer type
        streak++; // increments answer streak
        
        // new easiness factor based on the type
        if (type === 2) {
            easiness += 0.1;
        } else if (type === 3) {
            easiness += 0.2;
        } else {
            easiness += 0.25;
        };
        
        if (easiness < 1.2) { // condition for very low easiness
            easiness = 1.2; // changes easiness to a fixed value if it is to low
        };

        // set database stuff

        return true; // returns true to remove the flashcard from the current session
    } else if (type === 1) { // difficult response
        if (streak > 0) { // card was already answererd correctly before
            // new condition to set the interval based on the answer streak
            if (streak === 1) { // answer streak is 1
                interval = 1;
            } else if (streak === 2) { // answer streak is 2
                interval = 2;
            } else { // higher answer streak
                interval = Math.round((interval + 1) * easiness); // interval is updated based on the easiness factor
            };
            
            let nextDate = new Date(); // gets current date
            nextDate.setDate(nextDate.getDate() + interval); // updates date (for the flashcard to showagain) by the last interval
            streak++; // increments answer streak
    
            easiness = easiness - 0.1; // new (lower) easiness factor
            if (easiness < 1.2) { // condition for very low easiness
                easiness = 1.2; // changes easiness to a fixed value if it is to low
            };

            // set database stuff
    
            return true; // returns true to remove the flashcard from the current session
        } else { // card is either new or was answered incorrectly before
            return false; // returns false for not removing the flashcard from the current study array
        };
    } else { // incorrect response
        streak = 0; // resets answer streak
        // date is not changed for the flashcard to show up again in the session

        easiness = easiness - 0.2; // new (lower) easiness factor
        if (easiness < 1.2) { // condition for very low easiness
            easiness = 1.2; // changes easiness to a fixed value if it is to low
        };

        // set database stuff

        return false; // returns false for not removing the flashcard from the current study array
    };
};