import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getWhatWeDo } from "../../database";
import { getWwdSections } from "../../database";

const WwdArticle = () => {
  const [whatWeDo, setWhatWeDo] = useState([]);
  const [wwdSections, setWwdSections] = useState([]);

  useEffect(() => {
    getWhatWeDo(setWhatWeDo);
    getWwdSections(setWwdSections);
  }, []);

  const { id } = useParams();
  const sectionsForArticle = [];

  wwdSections.map((element) => {
    if (element.wwd_id == id) {
      sectionsForArticle.push(element);
    }
  });

  // Group sections by article ID
  const sectionsByArticle = wwdSections.reduce((acc, section) => {
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
          <div>
            <div className="div-back">
              <Link to="/whatwedo">
                <p className="allNewsLetters">
                  <i className="fa-solid fa-arrow-left"></i>Back to What We Do
                </p>
              </Link>
            </div>
          </div>
          <div className="article">
            {sectionsForArticle.map((section, index) => {
              if (index === 0) {
                return (
                  <div key={section.id}>
                    <h2>{section.section_header}</h2>
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

export default WwdArticle;
