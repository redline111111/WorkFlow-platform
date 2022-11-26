import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import styles from './index.module.css';

export const Registration = () => {
    const [stage, setStage] = useState(0);
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm({
        defaultValues: {
            firstName: '',
            secondName: '',
            city: [],
            login: '',
            password: '',
            email: '',
            role: 'Участник',
            sex: 'Мужской',
            age: 18,
        }
    });

    const handleNext = () =>{
        const nextStage = stage + 1;
        setStage(nextStage);
    }
    const handlePrev = () =>{
        const nextStage = stage - 1;
        setStage(nextStage);
    }
    const onSubmit = async (values) => {
        const city = values.city;
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
        )
        const { display_name, lat, lon } = (await response.json())[0]
        const name = display_name.match(/[А-ЯЁа-яё\s(«\-»)]+/)[0]
        delete values.city;
        values.location = {
            city: name,
            lat,
            lon
        }
        console.log(values);
        const data = await dispatch(fetchRegister(values));
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
                        <label aria-hidden="true">Регистрация</label>
                        {stage === 0 ? <>
                            <input type="text" name="firstName" placeholder="Имя" {...register('firstName', { required: true})}/>
                            <input type="text" name="secondName" placeholder="Фамилия" {...register('secondName', { required: true})}/>
                            <input type="text" name="city" placeholder="Город" {...register('city', { required: true})}/>
                            <input type="button" value="Дальше" className={styles.button} onClick={handleNext}/>
                        </> : <>
                            <input type="text" name="login" placeholder="Логин" {...register('login', { required: true})}/>
                            <input type="email" name="email" placeholder="Email" {...register('email', { required: true})}/>
                            <input type="password" name="password" placeholder="Пароль" {...register('password', { required: true})}/>
                            <input type="button" value="Назад" className={styles.button} onClick={handlePrev}/>
                            <input type="submit" value="Создать" className={styles.button}/>
                        </>}
                        
                    </form>
                </div>
            </div>	
       </div>
        		
       </>
    );
  
}
