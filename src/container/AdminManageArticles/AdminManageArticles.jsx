import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { getArticles } from "../../database";
import { getAuthors } from "../../database";
import { getArticleSections, getArticleSectionsById } from "../../database";

const AdminManageArticles = () => {
  const [authors, setAuthors] = useState([]);

  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleSectionsById, setArticleSectionsById] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedWwd, setUpdatedWwd] = useState({});

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  console.log("articles", articles);

  const handleArticleSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedArticle(selectedId);
    getArticleSectionsById(selectedId, setArticleSectionsById);
  };

  return (
    <div className="admin">
      <h1>Admin Manage Articles</h1>
      <AdminMenu />
      <br />
      <h3>Articles</h3>

      <select onChange={handleArticleSelect}>
        <option value="">Select article to edit</option>
        {articleSections
          .filter((section) => section.section_number === 1)
          .map((section) => (
            <option key={section.id}>{section.section_header}</option>
          ))}
      </select>
      <h3>Create new Article</h3>

      <table className="adminTable">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Create</th>
          </tr>
          <tr>
            <td>
              <input type="text" />
            </td>

            <td>
              <select name="" id="">
                <option value="">Choose author</option>
                {authors.map((author) => (
                  <option key={author.id}>{author.name}</option>
                ))}
              </select>
            </td>
            <td>
              <button>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageArticles;
