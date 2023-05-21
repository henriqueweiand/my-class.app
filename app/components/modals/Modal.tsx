'use client';

import { useCallback } from "react";
import Button from "../Button";

interface ModalProps {
  modalId: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  title?: string;
  onSubmit: () => void;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  body,
  footer,
  onSubmit,
  disabled
}) => {

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  return (
    <label id={modalId} className="modal cursor-pointer">
      <label className="modal-box relative" htmlFor="">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="py-4">{body}</div>
        {
          footer && (
            <div className="w-full flex flex-col gap-4">
              <Button
                outline
                disabled={disabled}
                label="Continue"
                onClick={handleSubmit}
              />
              <hr />
              {footer}
            </div>
          )
        }
      </label>
    </label>
  );
}

export default Modal;
