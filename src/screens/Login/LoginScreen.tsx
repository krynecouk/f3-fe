import React from "react";
import { Login, Modal } from "components";
import "./LoginScreen.scss";

export const LoginScreen = () => {
  return (
    <div className="login--page">
      <Modal id="modal__login" visible title="Sign-In" content={<Login />} />
    </div>
  );
};
