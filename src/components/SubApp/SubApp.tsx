import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { f3 } from "api";
import { Entry } from "store/entry/types";
import { Link } from "react-router-dom";
import { StoreState } from "store";

interface SubAppProps {
  fieldCode: string;
}

export const SubApp = ({ fieldCode }: SubAppProps) => {
  const [entries, setEntries] = useState([]);
  const entry: Entry | undefined = useSelector(
    (state: StoreState) => state.entry.current
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await f3.entries.getByParentFieldCode(entry!.id, fieldCode);
      setEntries(data || []);
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
