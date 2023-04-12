import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { getArticles, getNewestArticle } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      console.log("uid", uid);
    } else {
      // User is signed out
      // ...
      console.log("user is logged out");
    }
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newestArticle, setNewestArticle] = useState([]);

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getNewestArticle(setNewestArticle);
  }, []);

  const now = new Date();
  const newestArticleDate = new Date(newestArticle);
  const daysSinceLastArticle = Math.round(
    (now.getTime() - newestArticleDate.getTime()) / 86400000
  );

  return (
    <div className="admin">
      <h1>Admin Home</h1>
      <AdminMenu />
      <button onClick={handleLogout}>Logout</button>
      <h3>Stats</h3>
      <p>Articles created: {articles.length}</p>
      {newestArticle && (
        <>
          <p>
            Last article created {daysSinceLastArticle} days ago, on{" "}
            {newestArticleDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
            .
          </p>
        </>
      )}
    </div>
  );
};

export default AdminHome;
