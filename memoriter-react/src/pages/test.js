import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore/lite';

const { db } = firebase;


function TestPage() {

    //we use the useState and useEffekt because we want our page to update if the db updates


    const [folders, setFolders] = useState([]);
    //Link zur Collection 
    const foldersCollectionRef = collection(db, "folders");

    useEffect(() => {
        const getFolder = async () => {
            const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
            setFolders(allFolders.docs.map((doc)=>({...doc.data(), id: doc.id })))
        };
        
        getFolder();
    }, [])


    return (
    <div>
        {folders.map((folder) => {
            return <div> <h1>title: {folder.title}</h1> </div>; //render of things in db
            })}
        <input placeholder='Folder name'/>
        <button>create new folder</button>  
     </div>
    );
}

export default TestPage;
