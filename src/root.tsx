import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Navigate , Routes , Route } from 'react-router-dom';
import { mainProvider as MP } from './context/mainContext';
import App from './component/App';

import 'animate.css'
import './root.sass';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { PodcastTrackList } from './pages/podcastTrackList.page';
import { Track } from './pages';

const AppWithRoute = () => 
  <BrowserRouter>
    <Routes>
      <Route path=''  element={ <App/> }/>
      <Route path="*" element={ <Navigate to=''/> } />
      <Route path="podcast/:podcastid" element={ <PodcastTrackList/> }/>
      <Route path="podcast/:podcastid/episode/:episodeid" element={ <Track/> }/>
      
      {/*<Route path='podcast/:podcastid' element={ <Navigate to=''/> } />
      <Route path='podcast/:podcastid/episode/:episodeid' element={ <Navigate to=''/> } />*/}

    </Routes>
  </BrowserRouter>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MP><AppWithRoute/></MP>
  </React.StrictMode>
)

/*
<Routes>
          <Route path='' element={ <PublicRoute><Login/></PublicRoute> } />
          <Route path="*" element={ <PublicRoute><Navigate to=''/></PublicRoute> } />
          <Route path='hero/*' element={<PrivateRoute><Heroroute/></PrivateRoute>}/>
          <Route path="detail/:hid" element={ <PrivateRoute><HeroDetail/></PrivateRoute> } />
          <Route path="search/:sc" element={ <PrivateRoute><Search/></PrivateRoute> } />
        </Routes>
*/

export default App
