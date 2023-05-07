import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AuthContext } from './context/AuthContext';
import { Home, Article, Articles, WhatWeDo, GetInTouch, Donate, WwdArticle, About, AdminLogin, AdminHome, AdminManageArticles, AdminManageOgn, AdminManageTeam, AdminManageWhatWeDo } from './container';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isAdminPage = location.pathname.startsWith('/Admin');

  // If user is not authenticated and trying to access admin page, redirect them to login page
  if (!authUser && isAdminPage) {
    return <Navigate to="/AdminLogin" />;
  }

  // If user is authenticated and trying to access login page, redirect them to admin home page
  if (authUser && location.pathname === '/AdminLogin') {
    return <Navigate to="/AdminHome" />;
  }

  return (
    <div className="App">
      <AuthContext.Provider value={authUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Articles/:id" element={<Article />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/WhatWeDo" element={<WhatWeDo />} />
          <Route path="/WhatWeDo/:id" element={<WwdArticle />} />
          <Route path="/GetInTouch" element={<GetInTouch />} />
          <Route path="/About" element={<About />} />
          <Route path="/Donate" element={<Donate />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminManageArticles" element={<AdminManageArticles />} />
          <Route path="/AdminManageOgn" element={<AdminManageOgn />} />
          <Route path="/AdminManageTeam" element={<AdminManageTeam />} />
          <Route path="/AdminManageWhatWeDo" element={<AdminManageWhatWeDo />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
