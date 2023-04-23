import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";
import { images } from "../../constants";

import { getArticles } from "../../database";
import { getAuthors } from "../../database";
import { getArticleSections } from "../../database";
import { getWhatWeDo, getWwdSections } from "../../database";

const About = () => {
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
                <h2>About us</h2>
                <p>
                  The Watoto Library works to better the lives of children in
                  Kibera by providing free access to a library where kids can
                  come in and read books, do their school assignments, or get
                  free academic assistance and materials. Our work is soley run
                  by private funds and sponsors.
                </p>
              </div>
              <img src={images.insideTheLibrary} className="img" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
