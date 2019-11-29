import React, {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState
} from "react";
import "./Dropdown.scss";

type DropdownItem = {
  name: string;
  onClick?: (e: ReactMouseEvent<HTMLLIElement>) => void;
  isMain?: boolean;
};

type DropdownSeparator = "---";

interface DropdownProps {
  button: JSX.Element;
  items: (DropdownItem | DropdownSeparator)[];
}

export const Dropdown = ({ button, items }: DropdownProps) => {
  const node = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const EVENT = "mousedown";

    if (isVisible) {
      document.addEventListener(EVENT, handleClickOutside);
    } else {
      document.removeEventListener(EVENT, handleClickOutside);
    }
    return () => {
      document.removeEventListener(EVENT, handleClickOutside);
    };
  }, [isVisible]);

  const handleClickOutside = (e: MouseEvent) => {
    if (node && node.current && node.current.contains(e.target as Node)) {
      return;
    }
    setVisible(false);
  };

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
          }
          setVisible(false);
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
