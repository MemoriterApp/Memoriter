import Product from './pages/website/product';
import About from './pages/website/about';
import Blog from './pages/website/blog';
import BlogPost from './pages/website/blog-post';
import Download from './pages/website/download';
import Releases from './pages/website/releases';
import Impressum from './pages/website/impressum';
import Terms from './pages/website/terms';
import Privacy from './pages/website/privacy';
import Cookies from './pages/website/cookies';
import Faq from './pages/website/faq';
import Newsletter from './pages/website/newsletter';
import PageNotFound from './pages/website/page-not-found';

import SignIn from './pages/sign-in';
import Register from './pages/register';

import HomePage from './pages/home';
import TopicPage from './pages/topic';

import VisualModeProvider from './components/visual-mode-provider';
import { AuthProvider } from './components/routing/auth-provider';
import ScrollReset from './components/routing/scroll-reset';
import Redirect from './components/routing/redirect';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { firebase } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import blogs from './utils/blog-posts';

function App() {

  const [user, setUser] = useState({}); //variable for currently signed in user

  onAuthStateChanged(firebase.auth, (currentUser) => { //updates user variable when user changes
    setUser(currentUser);
  });

  //routing (connections to different sub-pages)
  return (
    <AuthProvider> {/*AuthProvider fixes an issue where wrong pages are displayed for a short amound of time on page load*/}
      <ScrollReset> {/*ScrollReset forces scrolling to top on navigation (fixes issue where the page kept beeing scrolled down)*/} 
        <VisualModeProvider> {/*VisualModeProvider is responsible for the light, dark and high contrast theme*/}
          <Routes>

            <Route path='/signin' element={<SignIn/>}/>

            <Route path='/register' element={<Register/>}/>

            <Route path='/product' element={<Product/>}/>

            <Route path='/about' element={<About/>}/>

            <Route path='/blog' element={<Blog topic='Latest'/>}/> {/*blog topics are different routes with the same page, but with filtered content*/}

            <Route path='/blog/topic/company' element={<Blog topic='Company'/>}/>

            <Route path='/blog/topic/productivity' element={<Blog topic='Productivity'/>}/>

            <Route path='/blog/topic/technology' element={<Blog topic='Technology'/>}/>

            <Route path='/blog/topic/miscellaneous' element={<Blog topic='Miscellaneous'/>}/>

            {/*blog posts (are mapped from the blog-posts.js file array)*/}
            {blogs.map((blog) => (
              <Route path={`/blog/${blog.link}`} element={<BlogPost blog={blog}/>} key={blog.title}/>
            ))}

            <Route path='/download' element={<Download/>}/>

            <Route path='/releases' element={<Releases/>}/>

            <Route path='/impressum' element={<Impressum/>}/>

            <Route path='/terms' element={<Terms/>}/>

            <Route path='/privacy' element={<Privacy/>}/>

            <Route path='/cookies' element={<Cookies/>}/>

            <Route path='faq' element={<Faq/>}/>

            <Route path='newsletter' element={<Newsletter/>}/>

            <Route path='*' element={<PageNotFound/>}/> {/*loads page not found page for all unset routes*/}

            {user? (<> {/*some of the active routes are altered if a user is signed in*/}
              <Route path='/' element={<HomePage/>}/>

              <Route path='/topic' element={<TopicPage/>}/>
            </>) : (<>
              <Route path='/' element={<Redirect/>}/>

              <Route path='/topic' element={<Redirect/>}/>
            </>)}

          </Routes>
        </VisualModeProvider>
      </ScrollReset>
    </AuthProvider>
  );
};

export default App;