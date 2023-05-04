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

          <br />

          <div className="article">
            <div class="flex-image-text">
              <div>
                <h3>Kibera and its Kids</h3>
                <p>
                  The Watoto Library is located in Kibera, in Nairobi, Kenya.
                  Kibera is the largest urban slum in Africa. Around 2,000,000
                  people live here in what is defined as extreme poverty,
                  earning less than US$2 per day. Unemployment rates are high
                  and many people cannot afford education for their children.
                </p>
                <div
                  class="div-readmore"
                  onclick="location.href='articles/kibera.html';"
                >
                  <p class="readmore">
                    Read more <i class="fa-solid fa-arrow-right"></i>
                  </p>
                </div>
              </div>
              <img src="#" className="img" />
            </div>
          </div>

          <br />

          <div className="article">
            <div class="flex-image-text">
              <div>
                <h3>Why The Watoto Library</h3>
                <p>
                  The Watoto Library is a support system to children suffering
                  silently and wishing to speak out. We help play a vital role
                  in empowering them by diligently promoting their confidence
                  and self esteem. We want to impact their childhood by also
                  encouraging them to have self discipline. We believe that when
                  they are treated with compassion, kindness, love and care,
                  they will grow up appreciating and respecting one another at
                  the same time building a culture of togetherness filled with
                  empathy for one another.
                </p>
              </div>
              <img src="#" class="img" />
            </div>
            <div class="flex-image-text">
              <div>
                <p>
                  When you visit our library, you will be inspired to see older
                  kids teaching young kids the little knowledge that they have.
                  We have created a culture of openness, trust and respect among
                  the kids to help them believe in themselves and one another.
                  We play our role by providing a place with electricity,
                  sitting and writing area. We are currently looking for funds
                  to help us buy more study materials such as textbooks that
                  will aid the kids with their learning.
                </p>
              </div>
              <img src="#" class="img" />
            </div>
          </div>

          <br />

          <div class="article">
            <h3>The Watoto Library</h3>
            <div class="iframe-div">
              <iframe
                src="https://www.youtube.com/embed/6_YBgK2wsEs"
                title="YouTube video player"
                class="img"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
