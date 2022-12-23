//All functions for initializing te database

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

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

export const firebase = { //export database functions
	app,
	db,
	auth
};