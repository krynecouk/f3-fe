import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="page-footer">
      <span className="page-footer__version">
        Version: {process.env.REACT_APP_VERSION}
      </span>
    </footer>
  );
};
