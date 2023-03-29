import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, Side } from "../../container";

//import { getArticles } from "../../database";
//import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";

const Article = () => {
  //const [authors, setAuthors] = useState([]);
  //const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);

  useEffect(() => {
    //getAuthors(setAuthors);
    //getArticles(setArticles);
    getArticleSections(setArticleSections);
  }, []);

  // filters articleSections, creates array that matches url ID
  //   const sectionsForArticle = articleSections.filter(
  //     (section) => section.article_id === match.params.id
  //   );
  const { id } = useParams();
  const sectionsForArticle = [];

  articleSections.map((element) => {
    if (element.article_id == id) {
      sectionsForArticle.push(element);
    }
  });

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
            {sectionsForArticle.map((section) => (
              <div key={section.id}>
                <h2>{section.section_header}</h2>
                <p>{section.section_text}</p>
              </div>
            ))}
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Article;
