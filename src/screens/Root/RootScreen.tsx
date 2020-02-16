import React, { useEffect, useState } from "react";
import { EntryViewScreen } from "screens";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { f3 } from "api";

export const RootScreen = () => {
  // FIXME: remove after fix of https://gitlab.com/doly/rypadlo/issues/22
  const [id, setId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await f3.entry.get();
      setId(data.id);
    };
    fetchData();
  }, []);
  // END

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch<{ id: string }>();
  // match.params = { ...match.params, id: ROOT_ID };
  match.params = { ...match.params, id: id }; // FIXME: remove after fix of https://gitlab.com/doly/rypadlo/issues/22

  console.log(match);

  return (
    <EntryViewScreen history={history} location={location} match={match} />
  );
};
