import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/auth/actions";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="login">
      <div className="username">
        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          autoFocus={true}
        />
      </div>
      <div className="password">
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="submit">
        <button onClick={() => dispatch(login(username, password))}>
          Submit
        </button>
      </div>
    </div>
  );
};
