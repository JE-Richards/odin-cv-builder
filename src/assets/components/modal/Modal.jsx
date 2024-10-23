import './styles/Modal.css';

export default function Modal(props) {
  const { isOpen, onConfirm, onClose, message } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Confirmation</h2>
        <p className="modal__message">{message}</p>
        <div className="modal__buttons">
          <button type="button" className="modal__btn btn" onClick={onConfirm}>
            Yes
          </button>
          <button type="button" className="modal__btn btn" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
