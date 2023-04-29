import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import {
  getArticles,
  getNewestArticle,
  getArticlesWithFirstSection,
  getWhatWeDo,
} from "../../database";
import { getAuthors, getAuthorById } from "../../database";

import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      //console.log("uid", uid);
    } else {
      navigate("/");
      // ...
      console.log("user is logged out");
    }
  });

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

  const [whatWeDo, setWhatWeDo] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newestArticle, setNewestArticle] = useState([]);
  const [articlesWithFirstSection, setArticlesWithFirstSection] = useState([]);
  const [color, setColor] = useState("black");

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getNewestArticle(setNewestArticle);
    getArticlesWithFirstSection(setArticlesWithFirstSection);
    updateColor();
    getWhatWeDo(setWhatWeDo);
  }, []);

  /* USING DAYS SINCE LAST ARTICLE FUNCTION */

  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const newestArticleDate = new Date(newestArticle + "Z");
  const daysSinceLastArticle = Math.round(
    (midnight.getTime() - newestArticleDate.getTime()) / 86400000
  );

  console.log("newest article", newestArticle);
  console.log("test");

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
            {daysSinceLastArticle < 0 ? (
              <span>
                Newest article set to be published in{" "}
                <b>{Math.abs(daysSinceLastArticle)}</b> days, on{" "}
                {newestArticleDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </span>
            ) : (
              <>
                Last article published{" "}
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
              </>
            )}
          </p>
        </>
      )}
      <br />
      <br />

      <h3>Articles</h3>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Publish date</th>
            <th>Edit date</th>
            <th>Title</th>
            <th>Published</th>
          </tr>

          {articlesWithFirstSection
            .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
            .map((article) => (
              <tr key={article.id}>
                <td>{article.article_id}</td>
                <td>
                  {new Date(article.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Europe/Berlin",
                  })}
                </td>
                <td>
                  {new Date(article.edit_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "Europe/Berlin",
                  })}
                </td>
                <td>{article.section_header}</td>
                <td>{article.published ? "✅" : "❌"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />
      <br />
      <h3>What We Do</h3>
      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Published</th>
          </tr>

          {whatWeDo.map((wwd) => (
            <tr key={wwd.id}>
              <td>{wwd.id}</td>

              <td>{wwd.name}</td>
              <td>{wwd.published ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
