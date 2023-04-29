import React from 'react';

import { 
  Home, Article, Articles, WhatWeDo, GetInTouch, Donate, WwdArticle, About,
  
  AdminLogin,
  AdminHome, 
  AdminManageArticles,
  AdminManageOgn,
  AdminManageTeam,
  AdminManageWhatWeDo
  
} from './container';


import './App.css';
import './articles.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AuthContext } from './context/AuthContext';

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className="App">
       <AuthContext.Provider value={authUser}>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/Articles/:id" element={<Article/>}/> 
            <Route path="/Articles" element={<Articles/>}/> 
            <Route path="/WhatWeDo" element={<WhatWeDo/>}/> 
            <Route path="/WhatWeDo/:id" element={<WwdArticle/>}/> 
            <Route path="/GetInTouch" element={<GetInTouch/>}/> 
            <Route path="/About" element={<About/>}/> 
            <Route path="/Donate" element={<Donate/>}/> 

            <Route path="/AdminLogin" element={<AdminLogin/>}/> 
            <Route path="/AdminHome" element={<AdminHome/>}/> 
            <Route path="/AdminManageArticles" element={<AdminManageArticles/>}/> 
            <Route path="/AdminManageOgn" element={<AdminManageOgn/>}/> 
            <Route path="/AdminManageTeam" element={<AdminManageTeam/>}/> 
            <Route path="/AdminManageWhatWeDo" element={<AdminManageWhatWeDo/>}/> 
        </Routes>
        </AuthContext.Provider>
    </div>
  );
}

export default App;