import Redirect from './technical/routing/redirect';

import LoginPage from './pages/login-stuff/login/login';
import SignUpPage from './pages/signup/signup';

import HomePage from './pages/home-stuff/home/home';
import TopicPage from './pages/topic-stuff/topic/topic';
import StudyPage from './pages/study-modes/regular/study-view/study';
import SpacedRepMode from './pages/study-modes/spaced-rep/study-view/spaced-rep';

import ThemeProvider from './components/theme-provider';
import { AuthProvider } from './technical/routing/auth-provider';
import ScrollReset from './technical/routing/scroll-reset';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { firebase } from './technical/utils/mongo';
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
                        <Route path='/topic' element={<TopicPage />} /> {/* always there for share folder */}
                        {user ? (<> {/* some of the active routes are altered if a user is signed in */}
                            <Route path='/' element={<HomePage />} />
                            <Route path='/study' element={<StudyPage />} />
                            <Route path='/spaced-repetition' element={<SpacedRepMode />} />
                        </>) : (<>
                            <Route path='/' element={<Redirect path='/login'/>} />
                            <Route path='/study' element={<Redirect path='/login'/>} />
                            <Route path='/spaced-repetition' element={<Redirect path='/login'/>} />
                        </>)}
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                    </Routes>
                </ThemeProvider>
            </ScrollReset>
        </AuthProvider>
    );
};
export default App;