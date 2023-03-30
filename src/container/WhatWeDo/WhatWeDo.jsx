import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getArticles } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";
import { getWwdSections } from "../../database";

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);
  const [wwdSections, setWwdSections] = useState([]);
  //const a = 1;

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
    getWwdSections(setWwdSections);
  }, []);

  // Group sections by article ID
  const sectionsByWwd = wwdSections.reduce((acc, section) => {
    if (!acc[section.wwd_id]) {
      acc[section.wwd_id] = [];
    }
    acc[section.wwd_id].push(section);
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="row" id="flex">
        <Side />
        <div className="main">
          {Object.keys(sectionsByWwd)
            .sort((a, b) => b - a)
            .map((articleId) => (
              <div key={articleId}>
                <br />
                <div className="article" id="{articleId}">
                  {sectionsByWwd[articleId].map((section, index) => {
                    if (index === 0) {
                      return (
                        <div key={section.id} className="flex-image-text">
                          <div>
                            <h2>{section.section_header}</h2>

                            <p>{section.section_text}</p>
                            <Link to={`/whatwedo/${section.wwd_id}`}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
