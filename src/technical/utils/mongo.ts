const url = 'https://app.memoriter.de/api/@memoriter/app/';
const urlAI = 'https://app.memoriter.de/api/@memoriter/ai/';

export async function getFlashcard(id: string): Promise<Flashcard> {
    return await fetch(`${url}flashcard/${id}`, {
        method: 'GET'
    }).then((x) => x.json());
}

export async function getFlashcards(id: string): Promise<Flashcard[]> {
    return await fetch(`${url}flashcards/${id}`, {
        method: 'GET'
    }).then((x) => x.json());
}

export async function updateFlashcard(id: string, updates: any) {
    return await fetch(`${url}flashcard/${id}`, {
        method: 'POST',
        body: JSON.stringify(updates)
    });
}

export async function insertFlashcard(title: string, content: string, folder: string, pos: number, user: User) {

    const flashcard: Flashcard = ({
        nextDate: new Date().getTime(),
        interval: 1,
        easiness: 2.5,
        streak: 0,
        pos,
        title: title,
        content: content,
        textAlign: 'left',
        textAlignSymbol: '< <',
        textAlignColor: 'rgb(48, 118, 48)',
        folder: folder,
        user: user.uid,
    });

    return await fetch(`${url}flashcard`, {
        method: 'PUT',
        body: JSON.stringify(flashcard)
    });
}

export async function removeFlashcard(id: string) {
    return await fetch(`${url}flashcard/${id}`, {
        method: 'DELETE'
    });
}

export async function getFolders(id: string): Promise<Folder[]> {
    return await fetch(`${url}folders/${id}`, {
        method: 'GET'
    }).then((x) => x.json());
}

export async function getFolder(id: string): Promise<Folder> {
    return await fetch(`${url}folder/${id}`, {
        method: 'GET'
    }).then((x) => x.json());
}

export async function insertFolder(title: string, pos: number, uid: string) {
    const folder: Folder = ({
        title: title,
        pos,
        user: uid,
        archived: false
    });

    return await fetch(`${url}folder`, {
        method: 'PUT',
        body: JSON.stringify(folder)
    });
}

export async function updateFolder(id: string, updates: any) {
    return await fetch(`${url}folder/${id}`, {
        method: 'POST',
        body: JSON.stringify(updates)
    });
}

export async function removeFolder(id: string) {
    return await fetch(`${url}folder/${id}`, {
        method: 'DELETE'
    });
}

export async function getFlashcardSuggestion(title: string): Promise<string> {
    const response = await fetch(`${urlAI}generate-suggestion/${title}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.suggestion;
}


import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { Flashcard, Folder } from '../../types';

const firebaseConfig = { //configuration and keys to connect to firebase
    apiKey: 'AIzaSyDBXsAk4E47Z9WyZ6__2WQNPnZi0aoWA4Q',
    authDomain: 'memoriter-802b0.firebaseapp.com',
    projectId: 'memoriter-802b0',
    storageBucket: 'memoriter-802b0.appspot.com',
    messagingSenderId: '7107097450',
    appId: '1:7107097450:web:5352b9a5f9abf638e76b13',
    measurementId: ' G-JES49GGH5N'
};

const app = initializeApp(firebaseConfig); //firebase app initialization
const auth = getAuth(app); //authentication initialization


export const firebase = { //export database functions
    app,
    auth
};
