import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getArticles } from "../../database";
import { getAuthors, getAuthorById } from "../../database";
import { getArticleSections } from "../../database";
import { getTeam } from "../../database";

const Home = () => {
  const [authors, setAuthors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleSections, setArticleSections] = useState([]);
  const [team, setTeam] = useState([]);
  //const a = 1;

  useEffect(() => {
    getAuthors(setAuthors);
    getArticles(setArticles);
    getArticleSections(setArticleSections);
    getTeam(setTeam);
  }, []);

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
          <div className="article">
            <h2>Board</h2>
            <div className="flex-container">
              <div className="row2">
                {team
                  .filter((team) => team.board)
                  .map((team) => (
                    <div className="column" id={team.name}>
                      <div
                        className="card"
                        style={{ marginTop: "10px", cursor: "auto" }}
                        key={team.id}
                      >
                        <div className="container">
                          <h2>{team.name}</h2>
                          <img src="" style={{ width: "100%" }} />
                          <p className="title">{team.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <br />

          <div className="article">
            <h2>Team</h2>
            <div className="flex-container">
              {team
                .filter((team) => !team.board)
                .map((team) => (
                  <div className="column" id={team.name}>
                    <div
                      className="card"
                      style={{ marginTop: "10px", cursor: "auto" }}
                      key={team.id}
                    >
                      <div className="container">
                        <h2>{team.name}</h2>
                        <img src="" style={{ width: "100%" }} />
                        <p className="title">{team.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <br />

          <div className="article" id="contact">
            <h2>Contact Us</h2>
            <p>
              We are currently working on improving our contact form. In the
              meantime, kindly contact us per email.
            </p>
            <p>
              For operational enquiries:{" "}
              <u>
                <a href="mailto:brandon@thewatotolibrary.org">
                  brandon@thewatotolibrary.org
                </a>
              </u>
              <br />
              For donation enquiries:{" "}
              <u>
                <a href="mailto:brandon@thewatotolibrary.org">
                  magnus@thewatotolibrary.org
                </a>
              </u>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
