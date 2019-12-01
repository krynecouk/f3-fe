import { useEffect, useState } from "react";
import { f3 } from "api";
import { Entry } from "store/entry/types";

export interface Suggest {
  appId: string;
  parentId: string;
  parentFieldCode: string;
}

export interface Suggests {
  appsHere: Suggest[];
  appsInParent: Suggest[];
}

const EMPTY_SUGGESTS: Suggests = {
  appsHere: [],
  appsInParent: []
};

export const useSuggests = (
  entry?: Entry
): [Suggests, (suggests: Suggests) => void] => {
  const [suggests, setSuggests] = useState<Suggests>(EMPTY_SUGGESTS);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (!entry) {
        result = await f3.root.suggest();
      } else {
        result = await f3.entry.suggest(entry.id);
      }
      setSuggests(result.data || EMPTY_SUGGESTS);
    };
    fetchData();
  }, [entry]);

  return [suggests, setSuggests];
};