import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <Link to="/adminhome">
        <button>Dashboard</button>
      </Link>
      <button>Create Article</button>
      <Link to="/adminmanagearticles">
        <button>Manage Articles</button>
      </Link>
      <button>Manage Team</button>
      <button>Manage Our Greatest Needs</button>
    </div>
  );
};

export default AdminMenu;
