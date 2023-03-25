import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getArticles, getArticleSectionsByArticle } from "../../database";
import { getAuthors, getAuthorById } from "../../database";

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  //const a = 1;

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    //getArticleSectionsByArticle(a, setvariable);
  }, []);
  console.log(articles);

  return (
    <div>
      <h1>Home</h1>

      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Articles</h2>
      <table>
        <tbody>
          <tr>
            <th>Content</th>
            <th>Author</th>
            <th>Newsletter</th>
          </tr>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.author_id}</td>
              <td>{article.newsletter ? "true" : "false"}</td>
            </tr>
          ))}
          {/* {articleSections.map((section) => (
            <tr key={section.id}>
              <td>Article id: {section.article_id}</td>
              <td>Section number: {section.section_number}</td>
            </tr>
          ))} */}
        </tbody>
      </table>

      <Link to="/articles">
        <button>Articles</button>
      </Link>
    </div>
  );
};

export default Home;
