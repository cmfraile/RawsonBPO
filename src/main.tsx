import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Navigate , Routes , Route } from 'react-router-dom';
import App from './component/App';
import { useState } from 'react';
import { Main , Podcast , Detail } from './pages';

import './main.sass';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

const AppWithRoute = () => 
  <BrowserRouter>
    <Routes>
      <Route path=''  element={ <App/> }/>
      <Route path="*" element={ <Navigate to=''/> } />
    </Routes>
  </BrowserRouter>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode><AppWithRoute/></React.StrictMode>
)

export default App
