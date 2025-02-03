import styles from './styles.module.scss';
// interface ModalProps {
//     onClose: () => void;
// }
export const Delivery = () => {
    return (
        <div className={styles.overlay} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} >
                    ×
                </button>
            </div>
        </div>
    );
}