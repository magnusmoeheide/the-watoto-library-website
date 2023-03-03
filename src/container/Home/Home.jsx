import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/articles">
        <button>Articles</button>
      </Link>
    </div>
  );
};

export default Home;
