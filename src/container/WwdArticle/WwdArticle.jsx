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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
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
            {sectionsForArticle
              .sort((a, b) => a.section_number - b.section_number)
              .map((section, index) => {
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
            {Object.keys(sectionsByArticle).map((articleId) => (
              <div key={articleId}>
                <div className="newsletter-wrapping">
                  {sectionsByArticle[articleId].map((section, index) => {
                    if (index === 0) {
                      return (
                        <div>
                          <Link to={`/whatwedo/${section.wwd_id}`}>
                            <a>{section.section_header}</a>
                          </Link>
                        </div>
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
