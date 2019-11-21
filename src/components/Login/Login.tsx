import React, { BaseSyntheticEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/auth/actions";
import { Input, Button } from "components";
import { StoreState } from "store";
import "./Login.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChanged, setChanged] = useState(true);
  const error = useSelector((state: StoreState) => state.auth.error);
  const dispatch = useDispatch();

  const onUsernameChange = (e: BaseSyntheticEvent) => {
    setChanged(true);
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: BaseSyntheticEvent) => {
    setChanged(true);
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(username, password));
    setChanged(false);
  };

  const isError = !!error && !isChanged;

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <div className="login__username">
          <Input
            onChange={onUsernameChange}
            id="username"
            type="text"
            placeholder="Username"
            invalid={isError}
            required
            autoFocus
          />
        </div>
        <div className="login__password">
          <Input
            onChange={onPasswordChange}
            id="password"
            type="password"
            placeholder="Password"
            invalid={isError}
            required
          />
          {isError && (
            <div className="login__error">
              <span>Incorrect username or password</span>
            </div>
          )}
        </div>
        <div className="login__submit">
          <Button
            type="submit"
            text="Sign-In"
            modifier={isError || !username || !password ? "invalid" : "valid"}
          />
        </div>
      </form>
    </div>
  );
};
