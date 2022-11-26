import styles from './index.module.css';
import { useSelector } from 'react-redux';
import { selectData, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import avatar from './avatar.jpg'
import Moment from 'react-moment';

export const Profile = () => {
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectData);

    if(!isAuth){
        return <Navigate to="/"/>
    }

    return (
        <>
        <div className={styles.main}>
            <div className={styles.info}>
                <div className={styles.data}>
                    <img src={avatar} alt="avatar" className={styles.avatar}/>
                    <div className={styles.field}>
                        <div className={styles.text}>
                            {user.login}
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.text}>
                           Entity
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.text}>
                            {user.isAdmin ? "Админ" : user.role}
                        </div>
                    </div>
                </div>
                <div className={styles.data}>
                    <div className={styles.name}>
                        <div className={styles.block}>
                            <div className={styles.field2}>
                                <div className={styles.text}>
                                    {user.firstName} {user.secondName}
                                </div>
                            </div>
                            <div className={styles.field2}>
                                <div className={styles.text}>
                                    {user.location.city}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.text}>
                            {user.sex}
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.text}>
                            {user.age} лет
                        </div>
                    </div>
                    
                    <div className={styles.field}>
                        <div className={styles.text}>
                            {<Moment format="c DD.MM.YYYY" date={user.createdAt}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>	
       </>
    );
  
}
