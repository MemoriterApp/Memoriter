import Start from './pages/start';
import About from './pages/about';
import ImpressumPage from './pages/impressum';
import PrivacyPage from './pages/privacy_policies';
import PatchNotes from './pages/patch_notes';

import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

import HomePage from './pages/home';
import TopicPage from './pages/topic';
import StudyPage from './pages/study';
import SpacedRepMode from './pages/spaced-rep.js';

import ThemeProvider from './components/theme-provider';
import { AuthProvider } from './components/routing/auth-provider';
import ScrollReset from './components/routing/scroll-reset';
import Redirect from './components/routing/redirect';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { firebase } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {

  const [user, setUser] = useState({}); //variable for currently signed in user

  onAuthStateChanged(firebase.auth, (currentUser) => { //updates user variable when user changes
    setUser(currentUser);
  });

  //routing (connections to different sub-pages)
  return (
    <AuthProvider> {/*AuthProvider fixes an issue where wrong pages are displayed for a short amound of time on page load*/}
      <ScrollReset> {/*ScrollReset forces scrolling to top on navigation (fixes issue where the page kept beeing scrolled down)*/} 
        <ThemeProvider> {/*ThemeProvider is responsible for the dark and light theme*/}
          <Routes>

            <Route path='/start' element={<Start/>}/>

            <Route path='/about' element={<About/>}/>

            <Route path='/impressum' element={<ImpressumPage/>}/>

            <Route path='/privacy' element={<PrivacyPage/>}/>

            <Route path='/patch-notes' element={<PatchNotes/>}/>

            {user? (<> {/*some of the active routes are altered if a user is signed in*/}
              <Route path='/login' element={<HomePage/>}/>

              <Route path='/signup' element={<HomePage/>}/>
              
              <Route path='/' element={<HomePage/>}/>

              <Route path='/topic' element={<TopicPage/>}/>

              <Route path='/study' element={<StudyPage/>}/>

              <Route path='/study-spaced-repetition/' element={<SpacedRepMode/>}/>
            </>) : (<>
              <Route path='/login' element={<LoginPage/>}/>

              <Route path='/signup' element={<SignUpPage/>}/>

              <Route path='/' element={<Redirect/>}/>

              <Route path='/topic' element={<Redirect/>}/>

              <Route path='/study' element={<Redirect/>}/>
            </>)}

          </Routes>
        </ThemeProvider>
      </ScrollReset>
    </AuthProvider>
  );
};
export default App;