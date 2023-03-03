import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <div>
      <h1>Articles</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Articles;
