import { Link } from 'react-router';
import styles from './styles.module.scss';
export const Registration = () => {
    return (
        <div className={styles.auhorization}>
            <div className={styles.auhorizationBlock}>
                <p className={styles.title}>Регистрация</p>
                <div className={styles.dataBlock}>
                    <input className={styles.inputLogin} type="text" placeholder='Логин' />
                    <input className={styles.inputPassword} type="text" placeholder='Пароль' />
                </div>
                <div className={styles.registration}>

                    
                </div>
                <button className={styles.signInBtn}>Зарегистрироваться</button>
                
            </div>
        </div>
    );
};