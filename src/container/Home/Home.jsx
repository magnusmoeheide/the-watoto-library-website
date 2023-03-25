import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAuthors, getArticlesByAuthor } from "../../database";
//import { getArticles } from "../../database";

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAuthors(setAuthors);
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Articles ID</th>
            <th>Articles</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.email}</td>
              <td>{author.articles_fk}</td>
              <td>
                {articles[author.id]?.map((article) => (
                  <p key={article.id}>{article.article_content}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/articles">
        <button>Articles</button>
      </Link>
    </div>
  );
};

export default Home;
