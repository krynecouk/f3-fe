import React, { useEffect, useState } from "react";
import { f3 } from "api";

export const HomeScreen = () => {
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
    </div>
  );
};
