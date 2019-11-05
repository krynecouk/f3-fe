import React, { useEffect, useState } from "react";
import { f3 } from "services/api";
import { Logout } from "components";
import { history } from "services/router";
import * as routes from "services/router/routes";
import { authService as as } from "services/auth";

export const HomeScene = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await f3.entry.get();
      setEntries(response.data);
    };
    fetchEntries();
  }, []);

  return (
    <div>
      <div>Number of entries: {entries.length}</div>
      <div>
        <Logout onLogout={logout} />
      </div>
    </div>
  );
};

const logout = () => {
  as.removeAuth();
  history.push(routes.LOGIN);
};
