
import { createContext, useState, useEffect } from 'react';



const ModalContext = createContext();


const ModalProvider = ({ children }) => {

    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        if (isModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isModalVisible]);
    
    
    const openModal = content => {
        setIsModalVisible(true);
        setModalContent(content);
    }

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent(null);
    }


    return (
        <ModalContext.Provider value={{ openModal, closeModal, modalContent, isModalVisible }}>
            {children}
        </ModalContext.Provider>
    )
}



export { ModalContext, ModalProvider }
