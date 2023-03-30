import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, Side } from "../../components";

import { getOurGreatestNeeds } from "../../database";

const Donate = () => {
  const [ourNeeds, setOurNeeds] = useState([]);

  useEffect(() => {
    getOurGreatestNeeds(setOurNeeds);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row" id="flex">
        <Side />
        <div className="main">
          <div className="article">
            <div className="flex-image-text">
              <div>
                <h2>Donate</h2>
                <p>
                  We greatly appreciate any donations coming in that will help
                  better the lives of children in Kibera.
                </p>
                <p>Asante sana - Thank you very much.</p>
                <p>
                  100% of your donation goes directly to its purpose. Our only
                  expenses are transaction fees.
                </p>
              </div>
              <img src="" alt="" />
            </div>
          </div>

          <br />

          <div className="article">
            <h3>Our Expenses</h3>
            <p>
              We pay rent for our two library rooms and electricity. Per year:
              <price style={{ marginTop: "0px" }}>US$ 540</price>
              <price style={{ marginTop: "0px" }}>KES 66,000</price>
            </p>

            <p>
              We compensate our two library keepers and instructors for their
              engagements. Per year:
              <price style={{ marginTop: "0px" }}>US$ 1,000</price>
              <price style={{ marginTop: "0px" }}>KES 100,000</price>
            </p>
            <p>
              Would you like to participate in keeping the library up and
              running? See donation options below.
            </p>
          </div>

          <br />

          <div className="article">
            <h3>Our Greatest Needs</h3>
            <div id="index-gallery">
              {ourNeeds.map((needs) => (
                <div className="item">
                  <img
                    src=""
                    alt=""
                    className="img"
                    style={{ border: "none" }}
                  />
                  <p>
                    <b>{needs.name}</b>
                    <br />
                    <div className="price">US$ {needs.usd_price}</div>
                    <div className="price">KES {needs.kes_price}</div>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <br />

          <div className="article" id="payment">
            <div className="flex-image-text">
              <div style={{ alignItems: "left", width: "100%" }}>
                <h3>Vipps</h3>
                <a
                  className="button-design paypal"
                  id="vippsPc"
                  href="media/donate/scanVipps.png"
                  target="_blank"
                >
                  Donate through Vipps
                </a>
                <a
                  className="button-design paypal"
                  id="vippsMobile"
                  href="https://qr.vipps.no/28/2/05/031/TpEsfHxap"
                  target="_blank"
                >
                  Donate through Vipps
                </a>
                <p>
                  Vippsnr: 786670 (MAGNUS HEIDE). This solution is only
                  available in Norway.
                </p>
              </div>
              <img
                src="media/donate/vipps.png"
                className="img-nozoom paypal"
                style={{ width: "15em", marginTop: "-0.6em" }}
              />
            </div>
          </div>

          <br />

          <div className="article">
            <div className="flex-image-text">
              <div style={{ alignItems: "left", width: "100%" }}>
                <h3>PayPal</h3>
                <a
                  className="button-design paypal"
                  href="https://www.paypal.com/donate/?hosted_button_id=F9WFK8JFMH49E"
                  target="_blank"
                >
                  Donate through PayPal
                </a>
                <p>
                  We accept both one-time donations and monthly donations
                  through PayPal.
                </p>
              </div>
              <img
                src="media/donate/paypal-transparent.png"
                className="img-nozoom paypal"
                style={{ width: "15em", marginBottom: "0.8em" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
