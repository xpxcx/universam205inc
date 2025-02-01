import React, { useEffect } from 'react';
import styles from './styles.module.scss';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export const ModalOrder: React.FC<ModalProps> = ({ children, onClose }) => {
    useEffect(() => {
        // Блокируем прокрутку при открытии модального окна
        document.body.style.overflow = 'hidden';
        
        // Возвращаем прокрутку при закрытии
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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
