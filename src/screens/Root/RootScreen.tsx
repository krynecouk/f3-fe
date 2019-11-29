import React, { useEffect, useState } from "react";
import { f3 } from "api";
import { Entry } from "store/entry/types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetEntry } from "store/entry/actions";

export const RootScreen = () => {
  const [entries, setEntries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await f3.root.get();
      setEntries(result.data);
    };
    dispatch(forgetEntry());
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <ul>
        {entries.map((entry: Entry) => (
          <li key={entry.id}>
            <Link to={`/entry/${entry.id}`}>
              {entry.appId}:{entry.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
