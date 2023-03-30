import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getArticles } from "../../database";
//import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

const Article = () => {
  //const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);

  useEffect(() => {
    //getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  console.log("articles", articles);

  const { id } = useParams();
  const sectionsForArticle = [];

  articleSections.map((element) => {
    if (element.article_id == id) {
      sectionsForArticle.push(element);
    }
  });

  // Group sections by article ID
  const sectionsByArticle = articleSections.reduce((acc, section) => {
    if (!acc[section.article_id]) {
      acc[section.article_id] = [];
    }
    acc[section.article_id].push(section);
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="row" id="flex">
        <Side />
        <div className="main">
          <div>
            <div className="div-back">
              <p className="allNewsLetters">
                <i className="fa-solid fa-arrow-left"></i>Back to Newsletters
              </p>
            </div>
          </div>
          <div className="article">
            {sectionsForArticle.map((section, index) => {
              if (index === 0) {
                return (
                  <div key={section.id}>
                    <h2>{section.section_header}</h2>
                    <h5>
                      <div className="date">
                        <i className="fa-regular fa-calendar"></i>Posted on{" "}
                        {
                          articles.find(
                            (article) =>
                              article.article_id === section.article_id
                          )?.publish_date
                        }
                      </div>
                    </h5>
                    <p>{section.section_text}</p>
                    <br />
                  </div>
                );
              } else {
                return (
                  <div key={section.id}>
                    <h3>{section.section_header}</h3>
                    <p>{section.section_text}</p>
                    <br />
                  </div>
                );
              }
            })}
            <br />
          </div>
          <br />
          <div className="article-click" style={{ cursor: "default" }}>
            <h3>Read More</h3>
            {Object.keys(sectionsByArticle)
              .sort((a, b) => b - a)
              .map((articleId) => (
                <div key={articleId}>
                  <div className="newsletter-wrapping">
                    {sectionsByArticle[articleId].map((section, index) => {
                      if (index === 0) {
                        return (
                          <a className="button">{section.section_header}</a>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Article;
