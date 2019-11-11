import React from "react";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="page-header">
      <div className="page-header__logo">
        <span className="page-header__logo--f">f</span>
        <span className="page-header__logo--3">3</span>
      </div>
      <div className="page-header__user">Docasny Hrbec</div>
    </header>
  );
};
