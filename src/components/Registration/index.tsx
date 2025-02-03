import React from 'react';
import styles from './styles.module.scss';
import { useGetCurrentUserQuery, useRegistrMutation } from '../../redux/userApiSlice';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
type FormInput = {
    login: string,
    password: string,
    room: string
};
export const Registration = () => {
    const [registrData, setRegistrData] = React.useState({
        login: '',
        password: '',
        room: ''
    });
    const navigate = useNavigate();
    const [ registr ] = useRegistrMutation();
    const onInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;
        setRegistrData( prev => ({
            ...prev,
            [name]: value
        }));
    }
    const { 
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset,
    } = useForm<FormInput>();
    const { refetch: refetchUser } = useGetCurrentUserQuery();
    const onClickRegistr = async(data: FormInput) => {
        try {
        const result = await registr(data).unwrap();
        localStorage.setItem('token', result.token);
        await refetchUser();
        navigate('/user');
        window.location.reload();
        reset();
        }catch(error) {
            console.log(error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onClickRegistr)}>
            <div className={styles.auhorization}>
                <div className={styles.auhorizationBlock}>
                    <p className={styles.title}>Регистрация</p>
                    <div className={styles.dataBlock}>
                        <input 
                        {...register('login',
                            {
                                required: 'Логин обязателен'
                            }
                        )}
                        className={styles.inputLogin} 
                        type="text" 
                        placeholder='Логин' 
                        />
                        {errors.login && <p>{errors.login.message}</p>}
                        <input 
                        {...register('password',
                            {
                                required: 'Пароль обязателен'
                            }
                        )} 
                        className={styles.inputPassword} 
                        type="text" 
                        placeholder='Пароль' 
                        />

                        <input 
                        {...register('room')}  
                        className={styles.inputRoom} 
                        type="text" 
                        placeholder='Комната (Для возможности доставки)' 
                        value={registrData.room} onChange={onInputData}/>

                    </div>
                    <div className={styles.registration}>

                        
                    </div>
                    <button type='submit' className={styles.signInBtn}>Зарегистрироваться</button>
                    
                </div>
            </div>
        </form>
    );
};