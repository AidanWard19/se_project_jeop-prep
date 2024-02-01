import "./Header.css";
import { currentDate } from "../../utils/constants";
import React from "react";
import Navigation from "../Navigation/Navigation.js";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <div className="header__logo">{`JEOP-PREP`}</div>
      </Link>
      <div className="header__date">{currentDate}</div>
      <Navigation />
    </header>
  );
};

export default Header;
