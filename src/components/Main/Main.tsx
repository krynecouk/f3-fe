import React, { useEffect } from "react";
import "./Main.scss";
import { useDispatch } from "react-redux";
import { fetchApps } from "store/app/actions";

export const Main = ({ children }: { children: any }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApps());
  });

  return <main>{children}</main>;
};
