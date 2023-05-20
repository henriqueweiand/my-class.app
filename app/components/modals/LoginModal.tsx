'use client';

import Modal from "./Modal";

const LoginModal = () => {
  const modalId = 'modal-login';

  const body = (
    <>
      login
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

export default LoginModal;
