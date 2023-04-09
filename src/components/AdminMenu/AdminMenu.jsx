import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <Link to="/adminhome">
        <button>Dashboard</button>
      </Link>
      <Link to="/adminmanagearticles">
        <button>Manage Articles</button>
      </Link>
      <Link to="/adminmanagewhatwedo">
        <button>Manage What We Do</button>
      </Link>
      <Link to="/adminmanageteam">
        <button>Manage Team</button>
      </Link>

      <Link to="/adminmanageogn">
        <button>Manage Our Greatest Needs</button>
      </Link>
    </div>
  );
};

export default AdminMenu;
