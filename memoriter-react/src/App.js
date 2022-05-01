import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ImpressumPage from './pages/impressum';
import PrivacyPage from './pages/privacy_policies';
import TermsPage from './pages/terms_of_use';
import HomePage from './pages/home';
import TopicPage from './pages/topic';
import TestPage from './pages/test';

function App() {

  const openFolder = (id, title) => {
    setSyncFolderID(id)
    setSyncFolderTitle(title)
  }

  const [ syncFolderID, setSyncFolderID ] = useState()
  const [ syncFolderTitle, setSyncFolderTitle ] = useState("")

  return (
    <div>
      <Routes>
      <Route path='/' element={<HomePage onOpenFolder={openFolder}/>}>
      </Route>

      <Route path='/impressum' element={<ImpressumPage/>}>
        
      </Route>

      <Route path='/privacy' element={<PrivacyPage />}>
        
      </Route>

      <Route path='/terms-of-use' element={<TermsPage />}>
        
      </Route>

      <Route path='/topic' element={<TopicPage
        syncedFolderID={syncFolderID} syncedFolderTitle={syncFolderTitle}
      />}>

      </Route>

      <Route path='/test' element={<TestPage/>}>

      </Route>
      </Routes>

    </div>
  );
}

export default App;
