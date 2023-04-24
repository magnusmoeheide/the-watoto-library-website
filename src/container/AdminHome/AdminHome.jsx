import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import {
  getArticles,
  getNewestArticle,
  getArticlesWithFirstSection,
} from "../../database";
import { getAuthors, getAuthorById } from "../../database";

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
  const [articlesWithFirstSection, setArticlesWithFirstSection] = useState([]);
  const [color, setColor] = useState("black");

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticlesWithFirstSection(setArticlesWithFirstSection);
    updateColor();
  }, []);

  /* USING DAYS SINCE LAST ARTICLE FUNCTION */

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const newestArticleDate = new Date(newestArticle + "Z");
  const daysSinceLastArticle = Math.round(
    (now.getTime() - newestArticleDate.getTime()) / 86400000
  );

  useEffect(() => {
    updateColor();
  }, [daysSinceLastArticle]);

  const updateColor = () => {
    if (daysSinceLastArticle > 20) {
      setColor("orange");
    } else if (daysSinceLastArticle > 31) {
      setColor("red");
    }
  };

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
            Last article created{" "}
            <b style={{ color: color }}>
              {daysSinceLastArticle === 0 ? "today" : daysSinceLastArticle}
            </b>{" "}
            {daysSinceLastArticle === 0 ? "" : "days ago, on "}
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
      <br />
      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Publish date</th>
            <th>Title</th>
            <th>Published</th>
          </tr>

          {articlesWithFirstSection.map((article) => (
            <tr key={article.id}>
              <td>{article.article_id}</td>
              <td>
                {new Date(article.publish_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </td>
              <td>{article.section_header}</td>
              <td>{article.published ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
