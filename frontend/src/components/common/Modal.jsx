
import useModal from '../../hooks/useModal';


const Modal = () => {
    const { isModalVisible, modalContent, closeModal } = useModal();

    if (!isModalVisible) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                {modalContent}
                <button onClick={closeModal}>Close Modal</button>
            </div>
        </div>
    );
}



export default Modal;
