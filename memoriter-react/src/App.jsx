import Product from './pages/product';
import About from './pages/about';
import SignIn from './pages/sign-in';
import Releases from './pages/releases';
import Register from './pages/register';
import Impressum from './pages/impressum';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Cookies from './pages/cookies';
import Faq from './pages/faq';
import PageNotFound from './pages/page-not-found';

import HomePage from './pages/home';
import TopicPage from './pages/topic';

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
        <Routes>

          <Route path='/signin' element={<SignIn/>}/>

          <Route path='/register' element={<Register/>}/>

          <Route path='/product' element={<Product/>}/>

          <Route path='/about' element={<About/>}/>

          <Route path='/releases' element={<Releases/>}/>

          <Route path='/impressum' element={<Impressum/>}/>

          <Route path='/terms' element={<Terms/>}/>

          <Route path='/privacy' element={<Privacy/>}/>

          <Route path='/cookies' element={<Cookies/>}/>

          <Route path='faq' element={<Faq/>}/>

          <Route path='*' element={<PageNotFound/>}/> {/*loads page not found page for all unset routes*/}

          {user? (<> {/*some of the active routes are altered if a user is signed in*/}
            <Route path='/' element={<HomePage/>}/>

            <Route path='/topic' element={<TopicPage/>}/>
          </>) : (<>
            <Route path='/' element={<Redirect/>}/>

            <Route path='/topic' element={<Redirect/>}/>
          </>)}

        </Routes>
      </ScrollReset>
    </AuthProvider>
  );
}

export default App;