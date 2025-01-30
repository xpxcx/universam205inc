import { Link, useNavigate } from 'react-router';
import styles from './styles.module.scss';
import React from 'react';
import { useAutorizeMutation } from '../../redux/userSlice';
export const Authorization = () => {
    const [signInData, setSignInData] = React.useState({
        login: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState('');
    React.useEffect(() => {
        setSignInData({ login: '', password: '' });
        setErrorMessage('');
    }, []);

    const [ login ] = useAutorizeMutation();
    const onInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


        setSignInData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const onClickSignIn = async () => {
        try {
            const result = await login(signInData).unwrap();
            localStorage.setItem('token', result.token);
            navigate('/user');
            console.log('Успешная Авторизация!');
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
        <div className={styles.auhorization}>
            <div className={styles.auhorizationBlock}>
                <p className={styles.title}>Авторизация</p>
                <div className={styles.dataBlock}>
                    <input name='login' className={styles.inputLogin} type="text" placeholder='Логин' value={signInData.login} onChange={onInputData} onFocus={() => setErrorMessage('')}/>
                    <input name='password' className={styles.inputPassword} type="password" placeholder='Пароль' value={signInData.password} onChange={onInputData} onFocus={() => setErrorMessage('')}/>
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
                
                <button className={styles.signInBtn} onClick={() => onClickSignIn()}>Войти</button>
                
            </div>
        </div>
    );
};