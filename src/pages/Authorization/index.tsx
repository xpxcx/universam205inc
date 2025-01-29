import { Link } from 'react-router';
import styles from './styles.module.scss';
export const Authorization = () => {
    return (
        <div className={styles.auhorization}>
            <div className={styles.auhorizationBlock}>
                <p className={styles.title}>Авторизация</p>
                <div className={styles.dataBlock}>
                    <input className={styles.inputLogin} type="text" placeholder='Логин' />
                    <input className={styles.inputPassword} type="text" placeholder='Пароль' />
                </div>
                <div className={styles.registration}>

                    <p className={styles.questions}>Нет аккаунта?</p>
                    <Link to='/registration'>
                        <p className={styles.linkToRegistr} >Зарегистрироваться</p> 
                    </Link>
                </div>
                <button className={styles.signInBtn}>Войти</button>
                
            </div>
        </div>
    );
};