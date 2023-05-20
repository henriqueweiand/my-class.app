'use client';

import Modal from "./Modal";

const RegisterModal = () => {
  const modalId = 'modal-register';

  const body = (
    <>
      Register
    </>
  )

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <Modal
        modalId={modalId}
        title={"title"}
        body={body}
      />
    </>
  );
}

export default RegisterModal;
