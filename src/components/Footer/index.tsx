import styles from './styles.module.scss';

export const Footer = () => {
    return (
        <div className={styles.futer}>
            <p className={styles.p}>Связаться С Нами:</p>
            <div className={styles.connection}>
                <a href="https://t.me/tg_dodopizza" className={styles.linkTG}>Сосед 1</a>
                
                <a href="https://t.me/Minimixrey" className={styles.linkTG}>Сосед 2</a>
            </div>
            <div className={styles.allRightReserved}>

                <p className={styles.rightsReservedDescr}>Все права защищены.</p>
                <p className={styles.universam205inc}>Universam205inc © 2024-2025.</p>
            </div>
        </div>
    );
};