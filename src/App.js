import React from 'react';

import { 
  Home, Article, Articles, WhatWeDo, GetInTouch, Donate, WwdArticle,
  
  AdminLogin,
  AdminHome, 
  AdminManageArticles
  
} from './container';

import './App.css';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
 
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/Articles/:id" element={<Article/>}/> 
            <Route path="/Articles" element={<Articles/>}/> 
            <Route path="/WhatWeDo" element={<WhatWeDo/>}/> 
            <Route path="/WhatWeDo/:id" element={<WwdArticle/>}/> 
            <Route path="/GetInTouch" element={<GetInTouch/>}/> 
            <Route path="/Donate" element={<Donate/>}/> 

            <Route path="/AdminLogin" element={<AdminLogin/>}/> 
            <Route path="/AdminHome" element={<AdminHome/>}/> 
            <Route path="/AdminManageArticles" element={<AdminManageArticles/>}/> 
        </Routes>
    </div>
  );
}

export default App;
