import Product from './pages/product';
import About from './pages/about';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Impressum from './pages/impressum';
import Terms from './pages/terms';
import Privacy from './pages/privacy';

import HomePage from './pages/home';
import TopicPage from './pages/topic';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import Startpage from './pages/Start';
import 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthProvider } from './contexts/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoutes from './components/PrivateRoutes';
import { firebase } from './utils/firebase';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function App() {

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
          <Route path='/homepage' element={<homepage />}>

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

          <Route element={<PrivateRoutes/>}>
            <Route path='/home' element={<HomePage />}></Route>
          </Route>

          <Route path='/' element={<HomePage/>}/>

          <Route path='/topic' element={<TopicPage/>}/>

          <Route path='/impressum' element={<Impressum/>}/>

          <Route path='/terms' element={<Terms/>}/>

          <Route path='/privacy' element={<Privacy/>}/>

          <Route path='/topic' element={<TopicPage/>}/>

          <Route path='/login' element={<HomePage/>}/>

          <Route path='/signup' element={<HomePage/>}/>

          <Route path='/product' element={<Product/>}/>

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
            <Route path='/home' element={<HomePage />}/>
          </Route>

          <Route path='/topic' element={<TopicPage />}/>

          <Route path='/impressum' element={<Impressum/>}/>

          <Route path='/' element={<Startpage/>}/>

          <Route path='/about' element={<About/>}/>

          <Route path='/terms' element={<Terms/>}/>

          <Route path='/privacy' element={<Privacy/>}/>

          <Route path='/topic' element={<TopicPage/>}/>

          <Route path='/login' element={<LoginPage/>}/>

          <Route path='/Signup' element={<SignUpPage/>}/>

          <Route path='/home' element={<HomePage />}/>

          <Route path='/product' element={<Product/>}/>

          <Route path='/signin' element={<SignIn/>}/>

          <Route path='/register' element={<Register/>}/>
          
        </Routes>

      </AuthProvider>
    </div>
  );
 }

}

export default App;