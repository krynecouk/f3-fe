import React from "react";
import { Modal } from "components";
import { CreateEntryForm } from "components/CreateEntryForm/CreateEntryForm";
import "./CreateEntryModal.scss";

interface CreateEntryModalProps {
  visible: boolean;
  toggle: () => void;
}

export const CreateEntryModal = ({
  visible,
  toggle
}: CreateEntryModalProps) => {
  return (
    <Modal
      id="modal__create-entry"
      visible={visible}
      title="Create Entry"
      onDismiss={toggle}
      content={<CreateEntryForm onCreate={toggle} />}
    />
  );
};
