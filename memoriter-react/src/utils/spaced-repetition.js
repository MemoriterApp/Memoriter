import { firebase } from './firebase';
import { updateDoc } from 'firebase/firestore/lite';

// This file contains the algorithm function to set the new date for the spaced repetition algorithm

// function gets the flashcard id answer type, correct answer streak, easiness factor and the last date
export const spacedRepetition = (id, type, streak, easiness, date) => {
    // five different answer types are possible (0-3)
    // 0 is incorrect, 1 is almost correct (with difficulties)
    // 2 is correct and 3 is easy (fast without any difficulties)

    // a conditional statement sets the new values
    if (type === 3) { // easy response
        return true;
    } else if (type === 2) { // correct response
        return true;
    } else if (type === 1) { // response for almost correct (with difficulties)
        return true;
    } else { // incorrect response
        streak = 0; // resets answer streak
        date.setDate(date.getDate() + 1); // updates date (for the flashcard to showagain) by one day

        return false; // returns false for not removing the flashcard from the current study array
    }
}