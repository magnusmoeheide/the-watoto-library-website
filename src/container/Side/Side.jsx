import React from "react";

const Side = () => {
  return (
    <div className="side" id="side">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick="location.href='index.html';"
      >
        <img src="media/logo/logo-transparent.png" className="img-nozoom" />
      </div>

      <div className="vision-statement">
        <p>
          Imagine a place <span>valued</span> and <span>appreciated</span>.
        </p>
        <p>
          A place where kids can come in, feel good about themselves,
          <span>trust</span> and <span>understand</span> one another.
        </p>
        <p>
          Imagine a place that believes that each child has a
          <span>potential</span> and <span>purpose</span>.
        </p>
        <p>
          It is our duty to remind them that they are <span>loved</span> and
          <span>seen</span> for who they are.
        </p>
        <p>
          I imagine of <span className="notranslate">The Watoto Library</span>.
        </p>
      </div>
      <br />
      <br />

      <div className="pointer">
        <div className="chess-peak">
          <img
            src="media/chess//boys-playing-chess.png"
            className="img-nozoom"
          />
        </div>
      </div>
      <br />
      <div className="side-vision">
        <h3>Our Mission</h3>
        <p>
          The principle goal of
          <span className="notranslate">The Watoto Library </span>is to have an
          impact on the lives of many kids living with the traumas of poverty,
          faced by domestic violence, denied or not provided with the space to
          express their thoughts and feelings.
        </p>
        <p>&#9733;</p>
        <p>
          Our library is dedicated to provide a safe and welcoming environment
          to kids so that they can come in and feel loved and appreciated. We
          are creating a society that values and respects its children.
        </p>
        <p>&#9733;</p>
        <p>
          A place where they can freely embrace who they are. Understand the
          value of one another. Engage them in activities that will help boost
          their confidence, self-esteem and improve their focus in all that they
          do.
        </p>
      </div>
    </div>
  );
};

export default Side;
