import Product from './pages/product';
import About from './pages/about';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Impressum from './pages/impressum';
import Terms from './pages/terms';
import Privacy from './pages/privacy';

import StartPage from './pages/Start';
import HomePage from './pages/home';
import TopicPage from './pages/topic';
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
    <Routes>

      <Route path='/product' element={<Product/>}/>

      <Route path='/about' element={<About/>}/>

      <Route path='/impressum' element={<Impressum/>}/>

      <Route path='/terms' element={<Terms/>}/>

      <Route path='/privacy' element={<Privacy/>}/>

      {user ? (<> {/*part of the routing changes if a user is logged in*/}
        <Route path='/' element={<HomePage/>}/>

        <Route path='/topic' element={<TopicPage/>}/>

        <Route path='/signin' element={<HomePage/>}/>

        <Route path='/register' element={<HomePage/>}/>
      </>) : (<> 
        <Route path='/' element={<StartPage/>}/>

        <Route path='/signin' element={<SignIn/>}/>

        <Route path='/register' element={<Register/>}/>
      </>)}

    </Routes>
  );
}

export default App;