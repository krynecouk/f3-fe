import React from "react";

interface LogoutProps {
  onLogout: () => void;
}

export const Logout = (props: LogoutProps) => {
  return (
    <div className="logout">
      <button onClick={() => props.onLogout()}>Logout</button>
    </div>
  );
};
