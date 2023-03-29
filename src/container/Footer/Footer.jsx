import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-footer">
        <div className="container-row">
          <div className="footer-col">
            <h4>
              <a href="index.html" style={{ color: "white" }}>
                <span className="notranslate">The Watoto Library</span>
              </a>
            </h4>
            <ul>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="articles.html">Newsletters</a>
              </li>
              <li>
                <a href="whatWeDo.html">What We Do</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              <a href="about.html" style={{ color: "white" }}>
                About
              </a>
            </h4>
            <ul>
              <li>
                <a href="about.html">About Us</a>
              </li>
              <li>
                <a href="getInTouch.html">Our Team</a>
              </li>
              <li>
                <a href="articles/brandonFrancis.html">The Founder</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              <a href="donate.html" style={{ color: "white" }}>
                Engage
              </a>
            </h4>
            <ul>
              <li>
                <a href="getInTouch.html#contact">Contact Us</a>
              </li>
              <li>
                <a href="getInTouch.html#partners">Partners</a>
              </li>
              <li>
                <a href="donate.html">Donate</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a
                href="https://www.facebook.com/thewatotolibraryprojectkenya"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/thewatotolibrary/"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCBiw_orAp_qbgRQc-_zUZ7w"
                target="_blank"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <ul>
              <li>
                <p>
                  © 2022
                  <span className="notranslate"> The Watoto Library</span>
                </p>
                <p className="developed">
                  Developed and designed by Magnus Heide
                </p>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
