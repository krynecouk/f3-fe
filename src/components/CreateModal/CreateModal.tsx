import React from "react";
import { CreateForm, Modal } from "components";
import "./CreateModal.scss";

interface CreateModalProps {
  visible: boolean;
  toggle: () => void;
}

export const CreateModal = ({ visible, toggle }: CreateModalProps) => {
  return (
    <Modal
      id="modal__create-entry"
      visible={visible}
      title="Create Entry"
      onDismiss={toggle}
      content={<CreateForm onCreate={toggle} />}
    />
  );
};
