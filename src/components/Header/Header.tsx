import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/auth/actions";
import { StoreState } from "store";
import { history, ROOT } from "router";
import { useModal } from "hooks/useModal";
import { CreateModal, Dropdown } from "components";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import { ReactComponent as Plus } from "./assets/plus.svg";
import { ReactComponent as User } from "./assets/user.svg";
import "./Header.scss";

export const Header = () => {
  const COMPANY_NAME = process.env.REACT_APP_NAME;
  const username = useSelector((state: StoreState) => state.auth.user.name);
  const [isVisible, toggleVisibility] = useModal("hidden");
  const dispatch = useDispatch();

  return (
    <header className="page-header">
      <div className="page-header__logo" onClick={() => history.push(ROOT)}>
        <Logo className="logo" />
        <span className="company-name">{COMPANY_NAME}</span>
      </div>
      {username && (
        <div className="page-header__right">
          <div className="page-header__create" onClick={toggleVisibility}>
            <span>Create</span>
            <Plus className="plus" />
          </div>
          <div className="page-header__user">
            <Dropdown
              button={
                <div className="user-dropdown__button">
                  <User className="user" />
                  <ArrowDown className="arrow-down" />
                </div>
              }
              items={[
                { name: username, isMain: true },
                "---",
                { name: "Sign Out", onClick: () => dispatch(logout()) }
              ]}
            />
          </div>
        </div>
      )}
      <CreateModal visible={isVisible} toggle={toggleVisibility} />
    </header>
  );
};
