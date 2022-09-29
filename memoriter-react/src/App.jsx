import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

import HomePage from './pages/home';
import TopicPage from './pages/topic';
import StudyPage from './pages/study';

import ThemeProvider from './components/theme-provider';
import { AuthProvider } from './components/routing/auth-provider';
import ScrollReset from './components/routing/scroll-reset';
import Redirect from './components/routing/redirect';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { firebase } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

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

            <Route path='/login' element={<LoginPage/>}/>

            <Route path='/signup' element={<SignUpPage/>}/>

            {user? (<> {/*some of the active routes are altered if a user is signed in*/}
              <Route path='/' element={<HomePage/>}/>

              <Route path='/topic' element={<TopicPage/>}/>

              <Route path='/study' element={<StudyPage/>}/>
            </>) : (<>
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