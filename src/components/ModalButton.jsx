
const ModalButton = ({label, classList, modalId}) => {

  return (
    <button type="button" className={`btn ${classList}`} data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}>
      {label}
    </button>
  );
};

export default ModalButton;
