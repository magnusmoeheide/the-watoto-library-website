import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getArticles } from "../../database";
import { getAuthors } from "../../database";
import { getArticleSections } from "../../database";

const AllArticles = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState("");
  const articleRef = useRef(null);

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  // Add year property to sections and group by year
  const sectionsByYear = articleSections.reduce((acc, section) => {
    const articleId = articles.find((a) => a.id === section.article_id);
    const year = new Date(articleId.publish_date).getFullYear();
    section.year = year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(section);
    return acc;
  }, {});

  const handleSelectArticle = (event) => {
    setSelectedArticle(event.target.value);
    articleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="row" id="flex">
        <div className="main">
          <div className="page">
            <Link to="/whatwedo">
              <div className="div-back">
                <p className="allNewsLetters">
                  <i className="fa-solid fa-arrow-left"></i>Back to What We Do
                </p>
              </div>
            </Link>
            <div
              className="article-click newsletters"
              style={{ cursor: "default" }}
            >
              <h2>Newsletters</h2>
              <select value={selectedArticle} onChange={handleSelectArticle}>
                <option value="">All Newsletters</option>
                {articleSections
                  .filter((section) => section.section_number === 1) // Filter by section_number
                  .sort(
                    (a, b) =>
                      new Date(b.publish_date) - new Date(a.publish_date)
                  ) // Sort by publish_date in descending order
                  .map((section) => (
                    <option key={section.id} value={section.article_id}>
                      <h2>
                        <span>
                          {new Date(
                            articles.find(
                              (article) => article.id === section.article_id
                            )?.publish_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                        <span> - </span>
                        {section.section_header}
                      </h2>
                    </option>
                  ))}
              </select>
            </div>

            <div className="timeline">
              {Object.keys(sectionsByYear)
                .sort((a, b) => b - a)
                .map((year) => (
                  <div className="timeline__group" key={year}>
                    <span className="timeline__year time" aria-hidden="true">
                      {year}
                    </span>
                    <div className="timeline__cards">
                      {sectionsByYear[year]
                        .filter((section) => section.section_number === 1) // Filter by section_number
                        .map((section) => (
                          <div
                            className="timeline__card article_card"
                            key={section.id}
                          >
                            <h2>{section.section_header}</h2>
                            <h5>
                              <div className="date">
                                <i className="fa-regular fa-calendar"></i>
                                Posted on{" "}
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
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllArticles;
