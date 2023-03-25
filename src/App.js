import React, {useState, useEffect} from 'react';

import { 
  Home, Articles
} from './container';

import './App.css';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
 
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/Articles" element={<Articles/>}/> 
        </Routes>
    </div>
  );
}

export default App;
