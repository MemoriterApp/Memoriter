const url = "http://localhost:8443/api/@memoriter/app/";

export async function getFlashcard(id: ObjectId): Promise<Flashcard> {
    return await fetch(`${url}flashcard/${id}`, {
        method: "GET"
    }).then(x => x.json())
}

export async function getFlashcards(id: ObjectId): Promise<Flashcard[]> {
    return await fetch(`${url}flashcards/${id.toHexString()}`, {
        method: "GET"
    }).then(x => x.json())
}

export async function updateFlashcard(id: ObjectId, updates: any) {
    return await fetch(`${url}flashcard/${id}`, {
        method: "POST",
        body: JSON.stringify(updates)
    });
}

export async function insertFlashcard(title: string, content: string, folder: ObjectId, pos: number, user: User) {

    const flashcard: Flashcard = ({
        _id: new ObjectId(),
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
    })

    return await fetch(`${url}flashcard`, {
        method: "PUT",
        body: JSON.stringify(flashcard)
    });
}

export async function removeFlashcard(id: ObjectId) {
    return await fetch(`${url}flashcard/${id}`, {
        method: "DELETE"
    })
}

export async function getFolders(id: string): Promise<Folder[]> {
    return await fetch(`${url}folders/${id}`, {
        method: "GET"
    }).then(x => x.json())
}

export async function getFolder(id: ObjectId): Promise<Folder> {
    return await fetch(`${url}folder/${id}`, {
        method: "GET"
    }).then(x => x.json())
}

export async function insertFolder(title: string, pos: number, uid: string) {
    const folder: Folder = ({
        _id: new ObjectId(),
        title: title,
        pos,
        user: uid,
        archived: false
    })

    return await fetch(`${url}folder`, {
        method: "PUT",
        body: JSON.stringify(folder)
    });
}

export async function updateFolder(id: ObjectId, updates: any) {
    return await fetch(`${url}folder/${id}`, {
        method: "POST",
        body: JSON.stringify(updates)
    });
}

export async function removeFolder(id: ObjectId) {
    return await fetch(`${url}folder/${id}`, {
        method: "DELETE"
    })
}

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, User } from 'firebase/auth';
import { Flashcard, Folder } from "../../types";
import ObjectId from "bson-objectid"

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
