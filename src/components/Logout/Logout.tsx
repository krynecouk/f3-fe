import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/auth/actions";

export const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div className="logout">
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};
