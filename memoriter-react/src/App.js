import { firebase } from './utils/firebase';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ImpressumPage from './pages/impressum';
import PrivacyPage from './pages/privacy_policies';
import TermsPage from './pages/terms_of_use';
import HomePage from './pages/home';
import TopicPage from './pages/topic';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthProvider } from './contexts/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoutes from './components/PrivateRoutes';

function App() {

  const openFolder = (id, title) => {
    setSyncFolderID(id)
    setSyncFolderTitle(title)
  }

  const [syncFolderID, setSyncFolderID] = useState()
  const [syncFolderTitle, setSyncFolderTitle] = useState("")

  const [user, setUser] = useState({});

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    });


  /*const [user, setUser] = useState(null);
  const login = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(firebase.auth, provider).then((results) => {
      console.log('just logged in', results);
      setUser(results);
    }).catch((error) => {
      console.log(error)
    });

    const logout = async () => {
      setUser(null);
    }

  }
  */
/*
  if (!!user) {
    return (
      <div>
        <Routes>
          <Route path='/' element={<HomePage />}>
          </Route>

          <Route path='/topic' element={<TopicPage syncedFolderID={syncFolderID} syncedFolderTitle={syncFolderTitle} />}>
          </Route>

          <Route path='/impressum' element={<ImpressumPage />}>

          </Route>

          <Route path='/privacy' element={<PrivacyPage />}>

          </Route>

          <Route path='/terms-of-use' element={<TermsPage />}>

          </Route>

          <Route path='/topic' element={<TopicPage />}>

          </Route>

          <Route path='/login' element={<LoginPage />}>

          </Route>
          <Route path='/signup' element={<SignUpPage />}>

          </Route>
          <Route path='/' element={<HomePage onOpenFolder={openFolder} />}>

          </Route>
        </Routes>

      </div>
    );
  }
  else {
    return (

      // <button onClick={login} type="submit" className="google-button">
      //     Sign in with Google 
      // </button>
      <div>
        <Routes>
          <Route path='/' element={<SignUpPage login={login} />}>
          </Route>

          <Route path='/impressum' element={<ImpressumPage />}>

          </Route>

          <Route path='/privacy' element={<PrivacyPage />}>

          </Route>

          <Route path='/terms-of-use' element={<TermsPage />}>

          </Route>

          <Route path='/topic' element={<TopicPage />}>

          </Route>

          <Route path='/login' element={<LoginPage />}>

          </Route>
          <Route path='/signup' element={<SignUpPage />}>

          </Route>
        </Routes>

      </div>
    );
  }
  */
 if (user) {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<HomePage />}>
        </Route>

        <Route path='/topic' element={<TopicPage syncedFolderID={syncFolderID} syncedFolderTitle={syncFolderTitle} />}>
        </Route>

        <Route path='/impressum' element={<ImpressumPage />}>

        </Route>

        <Route path='/privacy' element={<PrivacyPage />}>

        </Route>

        <Route path='/terms-of-use' element={<TermsPage />}>

        </Route>

        <Route path='/topic' element={<TopicPage />}>

        </Route>

        <Route path='/login' element={<LoginPage />}>

        </Route>
        <Route path='/Signup' element={<SignUpPage />}>

        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/home' element={<HomePage onOpenFolder={openFolder} />}></Route>
        </Route>
      </Routes>
      </AuthProvider>

    </div>
  );
 }
 else {
  return (
    <div>
      <AuthProvider>
      <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='/home' element={<HomePage />}></Route>
        </Route>

        <Route path='/topic' element={<TopicPage syncedFolderID={syncFolderID} syncedFolderTitle={syncFolderTitle} />}>
        </Route>

        <Route path='/impressum' element={<ImpressumPage />}>

        </Route>

        <Route path='/privacy' element={<PrivacyPage />}>

        </Route>

        <Route path='/terms-of-use' element={<TermsPage />}>

        </Route>

        <Route path='/topic' element={<TopicPage />}>

        </Route>

        <Route path='/login' element={<LoginPage />}>

        </Route>
        <Route path='/' element={<SignUpPage />}>

        </Route>
        <Route path='/home' element={<HomePage onOpenFolder={openFolder} />}>

        </Route>
      </Routes>
      </AuthProvider>

    </div>
  );
 }
  
}

export default App;
