import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { AdminMenu } from "../../components";
import { WordCounter } from "../../components";
import {
  getArticles,
  updateArticles,
  deleteArticles,
  createArticles,
  getArticlesWithAuthors,
  createAuthorForArticle,
} from "../../database";
import { getAuthors } from "../../database";
import {
  getArticleSections,
  getArticleSectionsById,
  updateArticleSectionsById,
  deleteArticleSectionsById,
  createArticleSectionsById,
} from "../../database";

const AdminManageArticles = () => {
  const [authors, setAuthors] = useState([]);

  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);
  const [articlesWithAuthors, setArticlesWithAuthors] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [articleSectionsById, setArticleSectionsById] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedArticle, setUpdatedArticle] = useState({});
  const [publishedDate, setPublishedDate] = useState(undefined);
  const [deletedSectionId, setDeletedSectionId] = useState(null);

  const [deletedArticleId, setDeletedArticleId] = useState(null);

  const [publishDateInputValue, setPublishDateInputValue] = useState(
    new Date().toISOString()
  );
  const [editDateInputValue, setEditDateInputValue] = useState("");
  const [publishedInputValue, setPublishedInputValue] = useState("");

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticlesWithAuthors(setArticlesWithAuthors);
    getArticleSections(setArticleSections);
  }, []);

  useEffect(() => {
    // initialize updatedArticle state with the data from the database
    const initialUpdatedArticle = {};
    articles.forEach((article) => {
      initialUpdatedArticle[article.id] = {
        publish_date: article.publish_date,
        edit_date: article.edit_date,

        published: article.published,
      };
    });
    setUpdatedArticle(initialUpdatedArticle);
  }, [articles]);

  useEffect(() => {
    // Set default values of input fields to values in article
    if (selectedArticle) {
      const publishDate = new Date(selectedArticle.publish_date);
      setPublishDateInputValue(publishDate);
    }
    const test = articles.filter((article) => {
      if (article.id === selectedArticle) {
        console.log(article);
        return article;
      }
    });
    console.log(selectedArticle, articles, test);
  }, [selectedArticle, updatedArticle]);

  useEffect(() => {
    // Set default values of input fields to values in article
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

  const handleSaveChanges = () => {
    window.location.reload();
    console.log("updatedData before saving:", updatedData);
    articleSectionsById.forEach((section) => {
      updateArticleSectionsById(
        section.id,
        updatedData[section.id].section_header,
        updatedData[section.id].section_text,
        updatedData[section.id].section_number
      );
    });
  };

  const handleSave = async (id, publish_date, edit_date, published) => {
    const publishDate = new Date(publish_date); // convert to Date object
    console.log("publishDate", publishDate, "publish_date", publish_date);
    const editDate = new Date(); // set edit_date to today's date in ISO format

    const updatedArticle = {
      publish_date: publishDate, // convert back to ISO format
      edit_date: editDate,
      published: published,
    };

    updateArticles(updatedArticle, id);
  };

  const handleAdd = async () => {
    const currentDate = new Date();
    const publishDate = currentDate.toISOString().slice(0, 10);
    const editDate = currentDate.toISOString().slice(0, 10);
    const published = false;

    const newArticle = await createArticles(publishDate, editDate, published);

    if (newArticle) {
      // Create the new article section
      const newSection = {
        section_header: "NEW ARTICLE (change this title)",
        section_text: "",
        section_number: 1,
        article_id: newArticle.id,
      };

      const createdSection = await createArticleSectionsById(
        newSection,
        newArticle.id
      );
      if (createdSection) {
        setArticleSectionsById([...articleSectionsById, createdSection]);
      }

      setArticles([...articles, newArticle]);
    }
    window.location.reload();
  };

  const handleAddSection = async () => {
    const totalSections = articleSectionsById.length;
    const articleId = Number(selectedArticle);
    const newSection = {
      section_header: "",
      section_text: "",
      section_number: totalSections + 1,
      article_id: articleId,
    };
    console.log("new section ", newSection);
    const createdSection = await createArticleSectionsById(
      newSection,
      selectedArticle
    );
    if (createdSection) {
      setArticleSectionsById([...articleSectionsById, createdSection]);
      setArticleSectionsById((prev) => [...prev]);
    }
    console.log("created section: ", createdSection);
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
    window.location.reload();
  };

  const handleDeleteSection = async (id) => {
    await deleteArticleSectionsById(id);
    setDeletedSectionId(id);
    setArticleSectionsById((prev) =>
      prev.filter((section) => section.id !== id)
    );
    console.log("id to delete: ", id);

    // Check if the article has any sections left
    if (articleSectionsById.length === 1) {
      // If the article has only one section left, delete the article
      await deleteArticles(articleSectionsById[0].article_id);
      setDeletedArticleId(articleSectionsById[0].article_id);
      setSelectedArticle(null);
    }
  };

  const updatePublishedDate = (date, article) => {
    article.publish_date = date + "T00:00:00.000Z";
    //article.publish_date = date;
    console.log(article, articles);
  };

  const handleSelectedAuthor = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleAddAuthor = () => {
    createAuthorForArticle(selectedAuthor, selectedArticle);
    console.log(
      "selectedAuthor",
      selectedAuthor,
      "selectedArticle",
      selectedArticle
    );
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

      <button onClick={handleAdd}>Create</button>

      <h2>Article info</h2>
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
                      <td>Publish date</td>
                      <td>Last edited</td>
                      <td>Published</td>
                      <td>Save</td>
                      <td>Delete</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="date"
                          value={
                            updatedArticle[article.id]?.publish_date
                              ? updatedArticle[article.id].publish_date.substr(
                                  0,
                                  10
                                )
                              : article.publish_date?.substr(0, 10)
                          }
                          onChange={(event) => {
                            const date = new Date(event.target.value);
                            const isoDate =
                              date.toISOString().substr(0, 10) +
                              "T00:00:00.000Z";

                            setPublishedDate(event.target.value);

                            setUpdatedArticle({
                              ...updatedArticle,
                              [article.id]: {
                                ...updatedArticle[article.id],
                                publish_date: isoDate,
                              },
                            });
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="date"
                          value={
                            updatedArticle[article.id]?.edit_date
                              ? updatedArticle[article.id].edit_date.substr(
                                  0,
                                  10
                                )
                              : article.edit_date?.substr(0, 10)
                          }
                          disabled
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          value={
                            updatedArticle[article.id]?.publish_date
                              ? updatedArticle[article.id].publish_date.substr(
                                  0,
                                  10
                                )
                              : article.publish_date?.substr(0, 10)
                          }
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
                            console.log(
                              article,

                              publishedDate
                            );
                            {
                              handleSave(
                                article.id,
                                updatedArticle[article.id].publish_date,
                                updatedArticle[article.id].edit_date,
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
                <br />
                <h2>Authors</h2>
                {articlesWithAuthors
                  .filter(
                    (article) =>
                      article.article_id === parseInt(selectedArticle)
                  )
                  .map((article) => (
                    <div key={article.name}>
                      <p>
                        {article.team_name} {article.author_id}
                      </p>
                    </div>
                  ))}
                {
                  <select onChange={handleSelectedAuthor}>
                    <option value="">Select author</option>
                    {authors.map((author) => (
                      <option value={author.team_id}>
                        {author.name} {author.team_id}
                      </option>
                    ))}
                  </select>
                }
                <button onClick={handleAddAuthor}>Add author</button>
              </div>
            ))}

          <br />
          <h2>Article</h2>
          <button onClick={handleSaveChanges}>Save section changes</button>
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

          <button onClick={handleAddSection}>Add Section</button>
        </div>
      )}
    </div>
  );
};

export default AdminManageArticles;
