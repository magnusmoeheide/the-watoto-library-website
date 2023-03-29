import React, {useState, useEffect} from 'react';

import { 
  Home, Article, Articles, AdminHome
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


            <Route path="/AdminHome" element={<AdminHome/>}/> 
        </Routes>
    </div>
  );
}

export default App;
