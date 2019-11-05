import React, { useState } from "react";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export const Login = (props: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <button onClick={() => props.onLogin(username, password)}>
          Submit
        </button>
      </div>
    </div>
  );
};
