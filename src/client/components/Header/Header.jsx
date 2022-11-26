import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectData, selectIsAuth } from '../../redux/slices/auth';
import styles from './Header.module.css';

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectData);
    const dispatch = useDispatch();

    const onClickLogout = () => {
        if(window.confirm('Вы действительно хотите выйти?')){
            dispatch(logout());
        }
    }
    return (
        <header className={styles.header}>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>
                    Бот
                </Link>
                <Link to="/dashboard" className={styles.link}>
                    Дэшборд
                </Link>
                    {isAuth ? <div className={styles.auth}>
                    <Link to={`/profile/${user.login}`} className={styles.link}>
                        Профиль
                    </Link>
                    <button className={styles.link} onClick = {onClickLogout}>Выход</button> 
                    </div> : <>
                        <div className={styles.auth}>
                            <Link to="/login" className={styles.link}>
                                Вход
                            </Link>
                            <Link to="/registration" className={styles.link}>
                                Регистрация
                            </Link>
                        </div>
                    </>}
                    
                    
                
                
            </div>
           
        </header>
    )
}