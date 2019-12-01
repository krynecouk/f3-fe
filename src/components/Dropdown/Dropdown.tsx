import React, { useCallback, useState } from "react";
import { useOuterClick } from "hooks/useOuterClick";
import "./Dropdown.scss";

type DropdownItem = {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  isMain?: boolean;
};

type DropdownSeparator = "---";

interface DropdownProps {
  button: JSX.Element;
  items: (DropdownItem | DropdownSeparator)[];
}

export const Dropdown = ({ button, items }: DropdownProps) => {
  const [isVisible, setVisible] = useState(false);
  const callback = useCallback(() => setVisible(false), []);
  const [node] = useOuterClick<HTMLDivElement>(isVisible, callback);

  const dropdownItem = ({ name, onClick, isMain }: DropdownItem) => {
    return (
      <li
        key={`dropdown__item--${name}`}
        className={`dropdown__item 
            ${onClick ? "dropdown__item--clickable" : ""}
            ${isMain ? "dropdown__item--main" : ""}`}
        onClick={e => {
          if (onClick) {
            onClick(e);
            setVisible(false);
          }
        }}
      >
        {name}
      </li>
    );
  };

  return (
    <div ref={node} className="dropdown">
      <div
        onClick={() => setVisible(!isVisible)}
        className={`dropdown__button ${
          isVisible ? "dropdown__button--active" : ""
        }`}
      >
        {button}
      </div>
      <ul
        className={`dropdown__menu dropdown__menu--${
          isVisible ? "visible" : "hidden"
        }`}
      >
        {items.map((item, index) =>
          typeof item === "string" ? <hr key={index} /> : dropdownItem(item)
        )}
      </ul>
    </div>
  );
};
