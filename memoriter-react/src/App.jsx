import Product from './pages/product';
import About from './pages/about';
import SignIn from './pages/sign-in';
import Releases from './pages/releases';
import Register from './pages/register';
import Impressum from './pages/impressum';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Cookies from './pages/cookies';
import PageNotFound from './pages/page-not-found';
import Redirect from './components/redirect';

import HomePage from './pages/home';
import TopicPage from './pages/topic';

import ScrollReset from './components/scroll-reset';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { firebase } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  const [user, setUser] = useState({}); //variable for currently signed in user

  onAuthStateChanged(firebase.auth, (currentUser) => { //updates user variable when user changes
    setUser(currentUser);
  });

  const permanentRoutes = [ //routes which are always needed (are stored in array to shorten the file)
    <Route path='/signin' element={<SignIn/>}/>,

    <Route path='/register' element={<Register/>}/>,

    <Route path='/product' element={<Product/>}/>,

    <Route path='/about' element={<About/>}/>,

    <Route path='/releases' element={<Releases/>}/>,

    <Route path='/impressum' element={<Impressum/>}/>,

    <Route path='/terms' element={<Terms/>}/>,

    <Route path='/privacy' element={<Privacy/>}/>,

    <Route path='/cookies' element={<Cookies/>}/>,

    <Route path='*' element={<PageNotFound/>}/> //loads page not found page for all unset routes
  ];

  //routing (connections to different sub-pages)
  if (user) {
    return (
      <ScrollReset> {/*scrollReset forces scrolling to top on navigation (fixes issue where the page kept beeing scrolled down)*/}
        <Routes>

          {permanentRoutes} {/*all routes from the array*/}

          <Route path='/' element={<HomePage/>}/>

          <Route path='/topic' element={<TopicPage/>}/>

        </Routes>
      </ScrollReset>
    );
  } else {
    return (
      <ScrollReset> {/*scrollReset forces scrolling to top on navigation (fixes issue where the page kept beeing scrolled down)*/}
        <Routes>

          {permanentRoutes} {/*all routes from the array*/}

          <Route path='/' element={<Redirect/>}/>

          <Route path='/topic' element={<Redirect/>}/>

        </Routes>
      </ScrollReset>
    );
  };
}

export default App;