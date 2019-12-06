import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { f3 } from "api";
import { Entry } from "store/entry/types";
import { Link } from "react-router-dom";
import { StoreState } from "store";

interface SubAppProps {
  fieldCode?: string;
}

export const SubApp = ({ fieldCode }: SubAppProps) => {
  const [entries, setEntries] = useState([]);
  const entry: Entry | undefined = useSelector(
    (state: StoreState) => state.entry.current
  );

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (!entry) {
        result = await f3.root.get();
      } else {
        result = await f3.entry.children(entry.id, fieldCode);
      }
      setEntries(result.data);
    };
    fetchData();
  }, [entry, fieldCode]);

  return (
    <div>
      {fieldCode && <h4>{fieldCode}</h4>}
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
