import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchApps } from "store/app/actions";
import { forgetEntry } from "store/entry/actions";
import "./Main.scss";

export const Main: FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApps());
    dispatch(forgetEntry());
  });

  return <main>{children}</main>;
};
