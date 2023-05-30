'use client';

import { useCallback, useEffect, useState } from "react";
import Button from "../Button";

interface ModalProps {
  body?: React.ReactElement;
  footer?: React.ReactElement;
  title?: string;
  onSubmit: () => void;
  disabled?: boolean;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
  disabled
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <input type="checkbox" onChange={() => { }} checked={isOpen} className="modal-toggle" />
      <label
        className={`
          modal
      `}>
        <label className="modal-box relative">
          <label onClick={() => onClose()} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">{body}</div>
          {
            footer && (
              <div className="w-full flex flex-col gap-4">
                {/* <Button
                  outline
                  disabled={disabled}
                  label="Continue"
                  onClick={handleSubmit}
                />
                <hr /> */}
                {footer}
              </div>
            )
          }
        </label>
      </label>
    </>
  );
}

export default Modal;
