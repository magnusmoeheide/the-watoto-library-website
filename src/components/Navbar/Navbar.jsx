import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <nav className="navbar-2" id="nav2" onClick="myFunction()">
        <span className="notranslate" style={{ userSelect: "none" }}>
          <a className="box-1-navbar-2">THE WATOTO LIBRARY</a>
        </span>
        <a href="javascript:void(0);" className="icon">
          <i
            className="fa fa-bars white-color"
            style={{ float: "right", display: "block" }}
            id="activate-menu"
          ></i>
          <i
            className="fa fa-remove white-color"
            style={{ float: "right", display: "none" }}
            id="deactivate-menu"
          ></i>
        </a>
      </nav>

      <ul className="navigation" id="nav">
        <li className={isActive("/")}>
          <Link to="/">HOME</Link>
        </li>

        <li className={isActive("/whatwedo")}>
          <Link to="/whatwedo">WHAT WE DO</Link>
        </li>

        <li className={isActive("/aboutus")}>
          <Link to="/">ABOUT US</Link>
        </li>

        <li className={isActive("/getintouch")}>
          <Link to="/getintouch">GET IN TOUCH</Link>
        </li>

        <li className={isActive("/donate")}>
          <Link to="/donate">DONATE</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
