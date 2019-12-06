import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetEntry } from "store/entry/actions";
import { SubApp } from "components";
import { Entry } from "store/entry/types";
import { StoreState } from "store";

export const RootScreen = () => {
  const entry: Entry = useSelector((state: StoreState) => state.entry.current)!;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(forgetEntry());
  }, [dispatch]);

  if (entry) {
    return <>Loading...</>;
  }

  return (
    <div className="root-view__content">
      <div>
        <h4>Root Entries:</h4>
        <SubApp />
      </div>
    </div>
  );
};
