import styles from './index.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();


    const {register, handleSubmit} = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values));
        
        if(!data.payload){
           return alert ("Ошибка авторизации");
        }

        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    if(isAuth){
        return <Navigate to="/"/>
    }

    return (
        <>
       <div className={styles.container}>
        <div className={styles.main}>
                <div className={styles.signup}>
                    <form onSubmit = {handleSubmit(onSubmit)}>
                        <label aria-hidden="true">Авторизация</label>
                        <input type="text" name="login" placeholder="Логин" {...register('login', { required: true})}/>
                        <input type="password" name="password" placeholder="Пароль" {...register('password', { required: true})}/>
                        <input type="submit" value="Войти" className={styles.button}/>
                    </form>
                </div>
            </div>	
       </div>
        		
       </>
    );
  
}
