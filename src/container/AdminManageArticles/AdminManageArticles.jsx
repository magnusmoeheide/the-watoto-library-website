import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { WordCounter } from "../../components";
import { getArticles, updateArticles, deleteArticles } from "../../database";
import { getAuthors } from "../../database";
import {
  getArticleSections,
  getArticleSectionsById,
  updateArticleSectionsById,
  deleteArticleSectionsById,
} from "../../database";

const AdminManageArticles = () => {
  const [authors, setAuthors] = useState([]);

  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleSectionsById, setArticleSectionsById] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedArticle, setUpdatedArticle] = useState({});
  const [deletedSectionId, setDeletedSectionId] = useState(null);

  const [deletedArticleId, setDeletedArticleId] = useState(null);

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  useEffect(() => {
    // Set default values of input fields to values in wwd
    if (articleSectionsById.length) {
      const defaultValues = articleSectionsById.reduce(
        (acc, section) => ({
          ...acc,
          [section.id]: {
            section_header: section.section_header,
            section_text: section.section_text,
            section_number: section.section_number,
          },
        }),
        {}
      );
      setUpdatedData(defaultValues);
    }
  }, [articleSectionsById]);

  console.log("articles", articles);

  const handleSaveChanges = () => {
    console.log("updatedData before saving:", updatedData);
    articleSectionsById.forEach((section) => {
      updateArticleSectionsById(
        section.id,
        updatedData[section.id].section_header,
        updatedData[section.id].section_text,
        updatedData[section.id].section_number
      );
    });
    window.location.reload();
  };

  const handleSave = async (
    id,
    author_id,
    publish_date,
    edit_date,
    newsletter,
    published
  ) => {
    console.log(
      "values",
      author_id,
      publish_date,
      edit_date,
      newsletter,
      published
    );
    const updatedArticle = {
      author_id,
      publish_date,
      edit_date,
      newsletter,
      published,
    };
    updateArticles(updatedArticle, id);
  };

  const handleArticleSelect = (event) => {
    const selectedId = event.target.value;
    console.log("selected id", selectedId);
    setSelectedArticle(selectedId);
    getArticleSectionsById(selectedId, setArticleSectionsById);
  };

  const handleDelete = async (id) => {
    await deleteArticles(id);
    setDeletedArticleId(id); // Update the state to trigger a re-render
  };

  const handleDeleteSection = async (id) => {
    await deleteArticleSectionsById(id);
    setDeletedSectionId(id);
    setArticleSectionsById((prev) =>
      prev.filter((section) => section.id !== id)
    );
    console.log("id to delete: ", id);
  };

  const filteredArticles = deletedArticleId
    ? articles.filter((article) => article.id !== deletedArticleId)
    : articles;

  return (
    <div className="admin">
      <h1>Admin Manage Articles</h1>
      <AdminMenu />
      <br />
      <h3>Create new Article</h3>

      <table className="adminTable">
        <tbody>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>Create</td>
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
      <button onClick={handleSaveChanges}>Save changes</button>
      <h3>Articles</h3>

      <select onChange={handleArticleSelect}>
        <option value="">Select article to edit</option>
        {articleSections
          .filter((section) => section.section_number === 1)
          .map((section) => (
            <option key={section.id} value={section.article_id}>
              {section.section_header}
            </option>
          ))}
      </select>

      {selectedArticle && (
        <div>
          {filteredArticles
            .filter((article) => article.id === parseInt(selectedArticle))
            .map((article) => (
              <div key={article.id} className="article">
                <h1></h1>
                <table>
                  <tbody>
                    <tr>
                      <td>Author</td>
                      <td>Publish date</td>
                      <td>Edit date</td>
                      <td>Newsletter</td>
                      <td>Published</td>
                      <td>Save</td>
                      <td>Delete</td>
                    </tr>
                    <tr>
                      <td>
                        <WordCounter
                          maxLength={25}
                          height={60}
                          value={
                            updatedArticle[article.id]?.author_id ??
                            article.author_id
                          }
                          onChange={(value) => {
                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                author_id: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        {" "}
                        <WordCounter
                          maxLength={25}
                          height={60}
                          value={
                            updatedArticle[article.id]?.publish_date ??
                            article.publish_date
                          }
                          onChange={(value) => {
                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                publish_date: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <WordCounter
                          maxLength={30}
                          height={60}
                          value={
                            updatedArticle[article.id]?.edit_date ??
                            article.edit_date
                          }
                          onChange={(value) => {
                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                edit_date: value,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={
                            updatedArticle[article.id]?.newsletter ??
                            article.newsletter
                          }
                          onChange={(e) => {
                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                newsletter: e.target.checked,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={
                            updatedArticle[article.id]?.published ??
                            article.published
                          }
                          onChange={(e) => {
                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                published: e.target.checked,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            {
                              console.log(
                                "IDddd",
                                article.id,
                                updatedArticle[article.id].author_id
                              );
                              handleSave(
                                article.id,
                                updatedArticle[article.id].author_id,
                                updatedArticle[article.id].publish_date,
                                updatedArticle[article.id].edit_date,
                                updatedArticle[article.id].newsletter,
                                updatedArticle[article.id].published
                              );
                            }
                          }}
                        >
                          Save changes
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => handleDelete(article.id)}
                          disabled={articleSectionsById.some(
                            (section) => section.article_id === article.id
                          )}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

          <br />

          {articleSectionsById
            .sort((a, b) => a.section_number - b.section_number)
            .map((section) => (
              <div key={section.id}>
                <div className="article left">
                  <p>
                    Section order:{" "}
                    <select
                      defaultValue={section.section_number}
                      onChange={(e) => {
                        const newSectionNumber = parseInt(e.target.value, 10);
                        setUpdatedData((prevData) => ({
                          ...prevData,
                          [section.id]: {
                            ...prevData[section.id],
                            section_number: newSectionNumber,
                          },
                        }));
                      }}
                    >
                      {Array.from(
                        { length: articleSectionsById.length },
                        (_, i) => i + 1
                      ).map((sectionNumber) => (
                        <option key={sectionNumber} value={sectionNumber}>
                          {sectionNumber}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <b>Title</b>
                    <WordCounter
                      maxLength={50}
                      value={
                        updatedData[section.id]?.section_header ??
                        section.section_header
                      }
                      onChange={(e) => {
                        setUpdatedData({
                          ...updatedData,
                          [section.id]: {
                            ...updatedData[section.id],
                            section_header: e,
                          },
                        });
                      }}
                    />
                  </p>
                  <p>
                    <b>Content</b>
                    <WordCounter
                      maxLength={500}
                      height={150}
                      value={
                        updatedData[section.id]?.section_text ??
                        section.section_text
                      }
                      onChange={(e) => {
                        setUpdatedData({
                          ...updatedData,
                          [section.id]: {
                            ...updatedData[section.id],
                            section_text: e,
                          },
                        });
                      }}
                    />
                  </p>
                  <button onClick={() => handleDeleteSection(section.id)}>
                    Delete section
                  </button>
                </div>
                <br />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageArticles;
