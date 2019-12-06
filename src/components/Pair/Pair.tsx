import React, { useState } from "react";
import { Input } from "components";
import "./Pair.scss";

type Pair = { [key: string]: string };

interface PairProps {
  id: string;
  value?: Pair;
  onChange: (pair: Pair) => void;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
}

export const Pair = ({
  id,
  value,
  onChange,
  readOnly,
  required,
  placeholder
}: PairProps) => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const getPair = (left: string, right: string) => {
    try {
      const toParse = `{"${left}":"${right}"}`;
      return JSON.parse(toParse);
    } catch (e) {
      return {};
    }
  };

  const commonAttributes: any = {
    id,
    readOnly,
    invalid: required && (!left || !right)
  };

  return (
    <div className="pair">
      <Input
        {...commonAttributes}
        {...(value ? { value: Object.keys(value)[0] } : {})}
        placeholder={`${placeholder}: key`}
        onChange={e => {
          setLeft(e.target.value);
          onChange(getPair(e.target.value, right));
        }}
      />
      <span>:</span>
      <Input
        {...commonAttributes}
        {...(value ? { value: Object.values(value)[0] } : {})}
        placeholder={`${placeholder}: value`}
        onChange={e => {
          setRight(e.target.value);
          onChange(getPair(left, e.target.value));
        }}
      />
    </div>
  );
};
