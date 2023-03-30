import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { getArticles } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

const AdminManageArticles = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  return (
    <div className="adminHome">
      <h1>Admin Manage Articles</h1>
      <AdminMenu />

      <table>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{getAuthorById(authors, article.authorId)?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageArticles;
