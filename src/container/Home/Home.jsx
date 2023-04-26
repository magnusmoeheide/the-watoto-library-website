import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getArticles } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);
  //const a = 1;

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  // Group sections by article ID and display if published
  const sectionsByArticle = articleSections.reduce((acc, section) => {
    const article = articles.find((a) => a.id === section.article_id);
    if (article && article.published === true && section.section_number == 1) {
      // Include a sort by publish date here once save publish date is fixed
      if (!acc[section.article_id]) {
        acc[section.article_id] = [];
      }
      acc[section.article_id].push(section);
    }
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="row" id="flex">
        <Side />
        <div className="main">
          {Object.keys(sectionsByArticle)
            .sort((a, b) => b - a)
            //.slice(0, 4)
            .map((articleId) => (
              <div key={articleId}>
                <br />
                <div className="article" id="{articleId}">
                  {sectionsByArticle[articleId].map((section, index) => {
                    if (index === 0) {
                      return (
                        <div key={section.id} className="flex-image-text">
                          <div>
                            <h2>{section.section_header}</h2>
                            <h5>
                              <div className="date">
                                <i className="fa-regular fa-calendar"></i>Posted
                                on{" "}
                                {new Date(
                                  articles.find(
                                    (article) =>
                                      article.id === section.article_id
                                  )?.publish_date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                            </h5>
                            <p>{section.section_text}</p>
                            <Link to={`/articles/${section.article_id}`}>
                              <div className="div-readmore">
                                <p className="readmore">
                                  Read more{" "}
                                  <i className="fa-solid fa-arrow-right"></i>
                                </p>
                              </div>
                            </Link>
                          </div>

                          <img src={section.image} />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            ))}
          <br />
          <Link to="/articles">
            <div className="article-click goToNews">
              <p className="readmore">
                All Newsletters <i className="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
