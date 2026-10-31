import React, { useEffect, useState } from "react";
// import request from "../../request"
// import row from "../Row/Row"
import search from "../../images/search-icon-sm.png";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const onScroll = () => handleShow(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="StreamBox logo" />

      {/* <div ></div> */}

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">TV Shows</a>
        <a href="/">Movies</a>
        <a href="/">New & Popular</a>
        <a href="/">My List</a>
        <a href="/">Browse by Language</a>
      </div>

      <div className="nav-search">
        {/* <input type="text" name="" id="" /> */}
        <a href="/">
          <img src={search} alt="searchimage" />
        </a>
        <a href="/">Kids</a>
        <a className="last" href="/">
          DVD
        </a>
      </div>

      <img
        className="nav__avatar"
        src={avatar}
        alt="Avatar Logo"
      />
    </div>
  );
}

export default Nav;
