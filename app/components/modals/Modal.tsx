'use client';

interface ModalProps {
  modalId: string;
  body?: React.ReactElement;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  body,
}) => {
  return (
    <label id={modalId} htmlFor={modalId} className="modal cursor-pointer">
      <label className="modal-box relative" htmlFor="">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{body}</p>
      </label>
    </label>
  );
}

export default Modal;
