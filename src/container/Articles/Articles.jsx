import React from "react";
import { Link } from "react-router-dom";

const AllArticles = () => {
  return (
    <div>
      <h1>Articles</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default AllArticles;
