import './App.css';
import { ReactDOM } from 'react-dom/client';
import React, { useState } from 'react';
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePage from './component/homepage';
import SignIn from './component/signin';
import SignUp from './component/signup';
import Layout from './component/layout';
import Verify from './component/verify'
function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" >
          <Route path="" element={<Layout />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='verify' element={<Verify />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
