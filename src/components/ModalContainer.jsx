const ModalContainer = ({children, modalId, title, onSubmit}) => {

  return (
    <div className="modal faded" id={modalId} tabIndex="-1"
         aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${modalId}Label`}>{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal">Cancelar
            </button>
            <button type="button" className="btn btn-primary px-4" onClick={onSubmit}>Crear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
