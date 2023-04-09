import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { getArticles, getNewestArticle } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

const AdminHome = () => {
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
