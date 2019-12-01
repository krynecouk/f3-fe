import { useState } from "react";

type ModalInitState = "hidden" | "visible";

export const useModal = (state: ModalInitState): [boolean, () => void] => {
  const [isVisible, setVisibility] = useState(state !== "hidden");

  const toggleVisibility = () => setVisibility(!isVisible);

  return [isVisible, toggleVisibility];
};
