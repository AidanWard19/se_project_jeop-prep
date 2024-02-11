import "./Header.css";
import React from "react";
import Navigation from "../Navigation/Navigation.js";
import { Link } from "react-router-dom";

const Header = ({ currentDate }) => {
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <div className="header__logo">
          <span className="header__full-text">{`JEOP PREP`}</span>
          <span className="header__short-text">{`JEOP PREP`}</span>
        </div>
      </Link>
      <div className="header__date">{currentDate}</div>
      <Navigation />
    </header>
  );
};

export default Header;
