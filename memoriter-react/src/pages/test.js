import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { async } from '@firebase/util';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

const { db } = firebase;


function TestPage() {

    //we use the useState and useEffekt because we want our page to update if the db updates


    const [folders, setFolders] = useState([]);
    const [newFolder, setNewFolder] = useState("");
    //Link zur Collection 
    const foldersCollectionRef = collection(db, "folders");

    useEffect(() => {
        const getFolder = async () => {
            const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
            setFolders(allFolders.docs.map((doc)=>({...doc.data(), id: doc.id })))
        };
        
        getFolder();
    }, [])

    //Function um den Link zur db herzustellen 
    // mit dieser Function wird die Data hinzugefügt
    const createFolder = async () => {
        await addDoc(foldersCollectionRef, {title: newFolder})
    }

    return (
    <div>
        {folders.map((folder) => {
            return <div> <h1>title: {folder.title}</h1> </div>; //render of things in db
            })}
        <input placeholder='Folder name' onChange={(event) => {setNewFolder(event.target.value)}}/>
        <button onClick={createFolder}>create new folder</button>  
     </div>
    );
}

export default TestPage;
