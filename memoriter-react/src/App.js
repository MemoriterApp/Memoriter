import { Route, Routes } from 'react-router-dom';
import ImpressumPage from './pages/impressum';
import PrivacyPage from './pages/privacy_policies';
import TermsPage from './pages/terms_of_use';
import HomePage from './pages/home';
import TopicPage from './pages/topic';

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<HomePage />}>
      </Route>

      <Route path='/impressum' element={<ImpressumPage/>}>
        
      </Route>

      <Route path='/privacy' element={<PrivacyPage />}>
        
      </Route>

      <Route path='/terms-of-use' element={<TermsPage />}>
        
      </Route>

      <Route path='/topic' element={<TopicPage/>}>

      </Route>
      </Routes>

    </div>
  );
}

export default App;
