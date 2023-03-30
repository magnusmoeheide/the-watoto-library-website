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
  const [articleSections, setArticleSections] = useState([]);

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getNewestArticle(setNewestArticle);
    getArticleSections(setArticleSections);
  }, []);

  console.log("newest article: ", newestArticle);

  return (
    <div className="adminHome">
      <h1>Admin Home</h1>
      <AdminMenu />

      <h3>Stats</h3>
      <p>Articles created: {articles.length}</p>
      <p>Last article created on: </p>
    </div>
  );
};

export default AdminHome;
