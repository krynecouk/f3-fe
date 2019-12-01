import { useEffect, useRef } from "react";

export const useOuterClick = <T extends HTMLElement>(
  listen: boolean,
  callback: () => void
) => {
  const node = useRef<T>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (node && node.current && node.current.contains(e.target as Node)) {
        return;
      }
      callback();
    };

    const EVENT = "mousedown";
    if (listen) {
      document.addEventListener(EVENT, onClickOutside);
    } else {
      document.removeEventListener(EVENT, onClickOutside);
    }
    return () => {
      document.removeEventListener(EVENT, onClickOutside);
    };
  }, [listen, callback]);

  return [node];
};
