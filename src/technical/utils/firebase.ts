/*import { Collection, MongoClient } from 'mongodb';

export class MongoManager {


    constructor(url) {
        this.client = new MongoClient(url);
    }

    folders() {
        const folders = this.client.db('Memoriter').collection('folders');
        return folders;
    }

    connect() {
        return this.client.connect();
    }

    async markUsed(code) {
        return await this.collection().updateOne({ coupon_code: code }, { $set: { used: new Date() } });
    }

    async getFolders(user) {
        return await this.folders().find({
            user: user
        }).toArray();
    }

    async updateFolderPosition(id, pos) {
        return await this.collection().updateOne({
            survey_code: code,
            coupon_code: null,
            inserted: new Date(),
            solved: null,
            used: null
        });
    }

    async checkSurveyCode(code) {
        const query = { survey_code: code };
        const result = await this.collection().findOne(query);
        if (result == null) return true; else return false;
    }

    async insertCouponCode(survey_code, coupon_code) {
        return await this.collection().updateOne({ survey_code: survey_code }, { $set: { coupon_code: coupon_code, solved: new Date() } });
    }

    async getTemplates() {
        return await this.templates().find({}).toArray();
    }

    async updateTemplate(code, template) {
        return await this.templates().updateOne({ code: template }, { $set: { code: code } });
    }

    async deleteTemplate(code) {
        return await this.templates().deleteOne({ code: code });
    }
}

export default MongoManager;

*/

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, query, collection, where, getDocs, DocumentReference, QuerySnapshot, DocumentData, QueryDocumentSnapshot, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { getAuth, User } from 'firebase/auth';
import { Flashcard, Folder } from "../../types";

const firebaseConfig = { //configuration and keys to connect to firebase
    apiKey: 'AIzaSyDBXsAk4E47Z9WyZ6__2WQNPnZi0aoWA4Q',
    authDomain: 'memoriter-802b0.firebaseapp.com',
    projectId: 'memoriter-802b0',
    storageBucket: 'memoriter-802b0.appspot.com',
    messagingSenderId: '7107097450',
    appId: '1:7107097450:web:5352b9a5f9abf638e76b13',
    measurementId:' G-JES49GGH5N'
};

const app = initializeApp(firebaseConfig); //firebase app initialization
const db = getFirestore(app); //database initialization
const auth = getAuth(app); //authentication initialization

export const getFlashcard = async (id: string): Promise<any> => {
    const flashcard = doc(db, 'flashcards', id);
    return flashcard;
}

export const getFlashcards = async (id: string): Promise<Flashcard[]> => {
    const q = query(collection(db, 'flashcards'), where('syncedFolder', '==', id));
    const flashcards = await getDocs(q);
    const results: Flashcard[] = [];

    flashcards.forEach((doc) => {
        const data = doc.data()

        results.push({
            ...data,
            id: doc.id
        } as Flashcard)
    })

    return results;
};

export const updateFlashcard = async (flashcard: DocumentReference, updates: any) => {
    const update = await updateDoc(flashcard, updates);
    return update;
};

export const insertFlashcard = async (title: string, content: string, syncedFolder: string, pos: number, user: User) => {
    const update = await addDoc(collection(db, 'flashcards'), {
        nextDate: new Date(),
        intervall: 1,
        easiness: 2.5,
        streak: 0,
        pos,
        title: title,
        content: content,
        textAlign: 'left',
        textAlignSymbol: '< <',
        textAlignColor: 'rgb(48, 118, 48)',
        syncedFolder: syncedFolder,
        user: user.uid,
    });

    return update;
};

export const removeFlashcard = async (id: string) => {
    const update = await deleteDoc(await getFlashcard(id));
    return update;
};

export const getFolders = async (id: string): Promise<Folder[]> => {
    const q = query(collection(db, 'folders'), where('user', '==', id));
    const folders = await getDocs(q);
    const results: Folder[] = [];

    folders.forEach((doc) => {
        const data = doc.data()

        results.push({
            ...data,
            id: doc.id
        } as Folder)
    })

    return results;
};

export const getFolder = async (id: string): Promise<any> => {
    const flashcard = doc(db, 'folders', id);
    return flashcard;
}

export const insertFolder = async (title: string, pos: number): Promise<any> => {
    await addDoc(collection(db, 'folders'), {
        pos,
        title: title,
        user: auth.currentUser!.uid,
        archived: false
    })
}

export const updateFolder = async (folder: DocumentReference, updates: any): Promise<any> => {
    const update = await updateDoc(folder, updates);
    return update;
}

export const removeFolder = async (id: string) => {
    const results = await deleteDoc(await getFolder(id))
    return results;
};

export const firebase = { //export database functions
    app,
    db,
    auth
};
