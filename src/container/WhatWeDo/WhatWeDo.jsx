import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";
import { images } from "../../constants";

import { getArticles } from "../../database";
import { getAuthors } from "../../database";
import { getArticleSections } from "../../database";
import { getWhatWeDo, getWwdSections } from "../../database";

const WhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState([]);
  const [wwdSections, setWwdSections] = useState([]);

  useEffect(() => {
    getWhatWeDo(setWhatWeDo);
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
          <div className="article">
            <div className="flex-image-text">
              <div>
                <h2>What We Do</h2>
                <div className="flex-container-2">
                  <div className="openhrs">Opening hours</div>
                  <div className="flex-container-2">
                    <div className="when">
                      <i className="fa-regular fa-calendar"></i>Mon - Fri: 4pm -
                      9pm
                    </div>
                    <div className="when">
                      <i className="fa-regular fa-calendar"></i>Sat - Sun: 8am -
                      9pm
                    </div>
                  </div>
                </div>
                <p>
                  We inspire, empower and facilitate childhood growth in areas
                  faced with poverty and oppression. We do studying, dancing,
                  computer classes and chess regularly. You can read more about
                  our other engagements in our newsletters.
                </p>
                <Link to="/articles">
                  <div className="div-readmore">
                    <p className="allNewsLetters">
                      All newsletters{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                  </div>
                </Link>
              </div>
              <img src={images.happyBoys} className="img" />
            </div>
          </div>
          {Object.keys(sectionsByWwd)
            .sort((a, b) => b - a)
            .map((articleId) => (
              <div key={articleId}>
                <br />
                <div className="article" id="{articleId}">
                  {sectionsByWwd[articleId].map((section, index) => {
                    if (index === 0) {
                      const article = whatWeDo.find(
                        (article) => article.id === section.article_id
                      );
                      const wwdItem = whatWeDo.find(
                        (item) => item.id === parseInt(articleId)
                      );

                      return (
                        <div key={section.id} className="flex-image-text">
                          <div>
                            <div className="flex-container-2">
                              <h3>{wwdItem && wwdItem.name}</h3>
                              <div className="flex-container-2">
                                <div className="coach">
                                  <i className="fa-solid fa-chalkboard-user"></i>
                                  {wwdItem && wwdItem.instructor}
                                </div>
                                <div className="amount">
                                  <i className="fa-solid fa-child"></i>
                                  {wwdItem && wwdItem.max_people}
                                </div>
                                <div className="when">
                                  <i className="fa-regular fa-clock"></i>
                                  {wwdItem && wwdItem.opening_hours}
                                </div>
                              </div>
                            </div>
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

export default WhatWeDo;
