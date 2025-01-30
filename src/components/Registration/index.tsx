import React from 'react';
import styles from './styles.module.scss';
import { useRegistrMutation } from '../../redux/userSlice';
export const Registration = () => {
    const [registrData, setRegistrData] = React.useState({
        login: '',
        password: '',
        room: ''
    });
    const [ registr ] = useRegistrMutation();
    const onInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;
        setRegistrData( prev => ({
            ...prev,
            [name]: value
        }));
    }

    console.log(registrData);
    const onClickRegistr = () => {
        registr(registrData);
    }
    return (
        <div className={styles.auhorization}>
            <div className={styles.auhorizationBlock}>
                <p className={styles.title}>Регистрация</p>
                <div className={styles.dataBlock}>
                    <input name='login' className={styles.inputLogin} type="text" placeholder='Логин' value={registrData.login} onChange={onInputData}/>
                    <input name='password' className={styles.inputPassword} type="text" placeholder='Пароль' value={registrData.password} onChange={onInputData}/>
                    <input name='room' className={styles.inputRoom} type="text" placeholder='Комната (Для возможности доставки)' value={registrData.room} onChange={onInputData}/>

                </div>
                <div className={styles.registration}>

                    
                </div>
                <button className={styles.signInBtn} onClick={() => onClickRegistr()}>Зарегистрироваться</button>
                
            </div>
        </div>
    );
};