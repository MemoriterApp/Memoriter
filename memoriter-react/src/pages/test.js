import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { async } from '@firebase/util';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

const { db } = firebase;


function TestPage() {

    //we use the useState and useEffekt because we want our page to update if the db updates


    const [folders, setFolders] = useState([]);
    const [newFolder, setNewFolder] = useState("");
    const [notes, setNotes] = useState([]);

    //Link zur Collection 
    const notesCollectionRef = collection(db, "notes")
    const foldersCollectionRef = collection(db, "folders");

    //Use Effect für folders
    useEffect(() => {
        const getFolder = async () => {
            const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
            setFolders(allFolders.docs.map((doc)=>({...doc.data(), id: doc.id })))
        };
        
        getFolder();
    }, [])

    //Use Effect für Notes
    useEffect(() => {
        const getNotes = async () => {
            const allNotes = await getDocs(notesCollectionRef)
            setNotes(allNotes.docs.map((doc)=>({...doc.data(), id: doc.id })))
        };

        getNotes();
    }, [])

    //Function um den Link zur db herzustellen 
    // mit dieser Function wird die Data hinzugefügt
    const createFolder = async () => {
        await addDoc(foldersCollectionRef, {title: newFolder})
    }

    return (
    <div>
        <div>
            {folders.map((folder) => {
                return <div> <h1>title: {folder.title}</h1> </div>; //render of things in db
                })}
            <input placeholder='Folder name' onChange={(event) => {setNewFolder(event.target.value)}}/>
            <button onClick={createFolder}>create new folder</button> 
        </div> 
        <div>
            {notes.map((notes) => {
                return <div> 
                    <h1>flashcard title: {notes.title}</h1> 
                    <h1>flashcard content: {notes.content}</h1>
                
                </div>
            })}
        </div>
     </div>
    );
}

export default TestPage;
