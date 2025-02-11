import { Link, useNavigate } from 'react-router';
import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { useAutorizeMutation } from '../../redux/userApiSlice';
import { useGetCartQuery } from '../../redux/apiSlice';
type FormInput = {
    login: string,
    password: string
};

export const Authorization = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState('');
    const { 
        register, 
        handleSubmit, 
    } = useForm<FormInput>();
    const [ login ] = useAutorizeMutation();
    const { refetch: refetchCart } = useGetCartQuery();
    
    const onSubmit = async (data: FormInput) => {
        try {
            const result = await login(data).unwrap();
            localStorage.setItem('token', result.token);
            refetchCart();
            navigate('/user');
            // reset();
        }catch(error: any) {
            if(error.data?.message === 'Пользователь не найден') {
                setErrorMessage('Пользователь не найден');
            }
            else if(error.data?.message === 'Неверный пароль') {
                setErrorMessage('Неверый пароль');
            }
            else {
                setErrorMessage('Непредвиденная ошибка при авторизации, попробуйте повторить попытку позже.');
            }
        }   
    }
    return (
        <div className={styles.authorization}>
            <div className={styles.authorizationBlock}>
                <p className={styles.title}>Авторизация</p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.dataBlock}>
                        <input 
                            className={styles.inputLogin}
                            type="text"
                            placeholder="Логин"
                            {...register('login', {
                                required: true
                            })}
                            onFocus={() => setErrorMessage('')}
                        />
                        <input 
                            className={styles.inputPassword}
                            type="password"
                            placeholder="Пароль"
                            {...register('password', {
                                required: true
                            })}
                            onFocus={() => setErrorMessage('')}
                        />
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <button className={styles.signInBtn} type="submit">
                            Войти
                        </button>
                        <div className={styles.signUpBlock}>
                            <p>Нет аккаунта?</p>
                            <Link to="/registration">Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};