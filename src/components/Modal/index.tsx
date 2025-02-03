import React, { useEffect } from 'react';
import stylesEdit from './stylesEdit.module.scss';
import stylesOrder from './stylesOrder.module.scss';
interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    stylesModal: 'editProduct' | 'order';
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, stylesModal }) => {
    useEffect(() => {
        // Блокируем прокрутку при открытии модального окна
        document.body.style.overflow = 'hidden';
        
        // Возвращаем прокрутку при закрытии
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    const styles = stylesModal === 'editProduct' ? stylesEdit : stylesOrder
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};
