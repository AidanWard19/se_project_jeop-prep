import "./Header.css";
import { currentDate } from "../../utils/constants";
import logo from "../../images/logo.svg";
import React from "react";

const Header = ({}) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
        <div className="header__date">{currentDate}</div>
      </div>
    </header>
  );
};

export default Header;
