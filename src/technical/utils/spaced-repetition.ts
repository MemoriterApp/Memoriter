import { getFlashcard, updateFlashcard } from './firebase';

// This file contains the algorithm function to set the new date for the spaced repetition algorithm

// function gets the flashcard id answer type, correct answer streak, easiness factor and the last interval
export const spacedRepetition = async (id: string, type: number, streak: number, easiness: number, interval: number) => {
    // five different answer types are possible (0-4)
    // 0 is incorrect, 1 is almost correct (with difficulties)
    // 2 is correct and 3 is easy (fast without any difficulties)
    // 4 is the easiest

    // property definitions for older flashcards without these values
    if (!streak) {
        streak = 0;
    }
    if (!easiness) {
        easiness = 2.5;
    }
    if (!interval) {
        interval = 1;
    }

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
        }

        let nextDate = new Date(); // gets current date
        nextDate.setDate(nextDate.getDate() + interval + type - 2); // updates date (for the flashcard to showagain) by the last interval and answer type
        nextDate.setHours(0, 0, 0, 0); // sets time to 0 o'clock
        streak++; // increments answer streak

        // new easiness factor based on the type
        if (type === 2) {
            easiness += 0.1;
        } else if (type === 3) {
            easiness += 0.2;
        } else {
            easiness += 0.25;
        }

        if (easiness < 1.2) { // condition for very low easiness
            easiness = 1.2; // changes easiness to a fixed value if it is to low
        }

        // variables and functions to update the flashcard document at the database
        const flashcard = await getFlashcard(id); // reference to the document
        const newProps = { // object of updated properties
            streak: streak,
            easiness: easiness,
            interval: interval,
            nextDate: nextDate
        };
        updateFlashcard(flashcard, newProps); // updates the document

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
            }

            let nextDate = new Date(); // gets current date
            nextDate.setDate(nextDate.getDate() + interval); // updates date (for the flashcard to showagain) by the last interval
            nextDate.setHours(0, 0, 0, 0); // sets time to 0 o'clock
            streak++; // increments answer streak

            easiness = easiness - 0.1; // new (lower) easiness factor
            if (easiness < 1.2) { // condition for very low easiness
                easiness = 1.2; // changes easiness to a fixed value if it is to low
            }

            // variables and functions to update the flashcard document at the database
            const flashcard = await getFlashcard(id); // reference to the document
            const newProps = { // object of updated properties
                streak: streak,
                easiness: easiness,
                interval: interval,
                nextDate: nextDate
            };
            updateFlashcard(flashcard, newProps); // updates the document

            return true; // returns true to remove the flashcard from the current session
        } else { // card is either new or was answered incorrectly before
            return false; // returns false for not removing the flashcard from the current study array
        }
    } else { // incorrect response
        streak = 0; // resets answer streak
        // date is not changed for the flashcard to show up again in the session

        easiness = easiness - 0.2; // new (lower) easiness factor
        if (easiness < 1.2) { // condition for very low easiness
            easiness = 1.2; // changes easiness to a fixed value if it is to low
        }

        // variables and functions to update the flashcard document at the database
        const flashcard = await getFlashcard(id); // reference to the document
        const newProps = { // object of updated properties
            streak: streak,
            easiness: easiness,
            interval: interval,
        };
        updateFlashcard(flashcard, newProps); // updates the document

        return false; // returns false for not removing the flashcard from the current study array
    }
};