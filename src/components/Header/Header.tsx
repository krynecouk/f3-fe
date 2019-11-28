import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "store";
import { Dropdown } from "components/Dropdown/Dropdown";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import { logout } from "store/auth/actions";
import "./Header.scss";

export const Header = () => {
  const COMPANY_NAME = process.env.REACT_APP_NAME;
  const username = useSelector((state: StoreState) => state.auth.user.name);
  const dispatch = useDispatch();

  return (
    <header className="page-header">
      <div className="page-header__logo">
        <Logo className="logo" />
        <span className="company-name">{COMPANY_NAME}</span>
      </div>
      {username && (
        <div className="page-header__user">
          <Dropdown
            button={
              <div className="user-dropdown__button">
                <span className="username">{username}</span>
                <ArrowDown className="arrow-down" />
              </div>
            }
            items={[{ name: "Sign Out", onClick: () => dispatch(logout()) }]}
          />
        </div>
      )}
    </header>
  );
};
