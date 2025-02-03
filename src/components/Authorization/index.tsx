import { Link, useNavigate } from 'react-router';
import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';
import { useAutorizeMutation, useGetCurrentUserQuery } from '../../redux/userApiSlice';

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
        reset,
    } = useForm<FormInput>();
    const [ login ] = useAutorizeMutation();
    const { refetch: refetchUser } = useGetCurrentUserQuery();

    
    const onSubmit = async (data: FormInput) => {
        try {
            const result = await login(data).unwrap();
            localStorage.setItem('token', result.token);
            await refetchUser();
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
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <div className={styles.auhorization}>
            <div className={styles.auhorizationBlock}>
            <p className={styles.title}>Авторизация</p>

            <div className={styles.dataBlock}>
                    <input 
                    {...register('login', {
                        required: 'Логин обязателен'
                    })}
                    className={styles.inputLogin} 
                    type="text" 
                    placeholder='Логин' 
                    onFocus={() => setErrorMessage('')}
                    />
                    <input 
                    {...register('password', { 
                        required: 'Пароль обязателен'
                    }
                    )}
                    className={styles.inputPassword} 
                    type="password" 
                    placeholder='Пароль' 
                    onFocus={() => setErrorMessage('')}/>
                </div>
                
                {errorMessage === 'Пользователь не найден' &&
                    (<div className={styles.registration}>
                        <p className={styles.questions}>Похоже, Вы ещё не зарегистрированы.</p>
                        <Link to='/registration'>
                                <p className={styles.linkToRegistr} >Зарегистрироваться</p> 
                        </Link> 
                    </div>)
                }
                {errorMessage === 'Неверый пароль' &&
                    <div className={styles.registration}>
                        <p className={styles.questions}>{errorMessage}</p>
                    </div>
                }
                {errorMessage === '' && 
                    <div className={styles.registration}>

                    <p className={styles.questions}>Нет аккаунта?</p>
                    <Link to='/registration'>
                        <p className={styles.linkToRegistr} >Зарегистрироваться</p> 
                    </Link>
                    </div>
                }
                
                <button type='submit' className={styles.signInBtn}>Войти</button>
                
            </div>
        </div>
        </form>

    );
};