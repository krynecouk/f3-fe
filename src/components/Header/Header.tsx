import React from "react";
import "./Header.scss";
import { useSelector } from "react-redux";
import { StoreState } from "store";

export const Header = () => {
  const username = useSelector((state: StoreState) => state.auth.user.name);

  return (
    <header className="page-header">
      <div className="page-header__logo">
        <span className="page-header__logo--f">f</span>
        <span className="page-header__logo--3">3</span>
      </div>
      <div className="page-header__user">{username}</div>
    </header>
  );
};
