import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatch, newQuestion, fetchAllQuestions, fetchAddAnswer} from "../../redux/slices/bot";
import styles from "./index.module.css"
import { BotResult } from '../../components';
import { selectData } from "../../redux/slices/auth";


export const Bot = () => {
    const dispatch = useDispatch();
    const qa = useSelector((state) => (state.bot.qa));
    const data = useSelector(selectData);

    
    const {register, handleSubmit} = useForm({
        defaultValues: {
            question: '',
        }
    });

    const onSubmit = async (values) => {
        console.log(values.question);
        const data = await dispatch(fetchMatch(values.question));
        
        if(!data.payload){
           return alert ("Некорректный вопрос");
        }
    }

    const onQuestion = async (values) => {
        const data = await dispatch(fetchAddAnswer({
            data: values.question,
            answer: values.answer
        }));
        
        if(!data.payload){
           return alert ("Некорректный вопрос");
        }
    }

    const getQustions = async () => {
        const data = await dispatch(fetchAllQuestions());

        if(!data.payload){
           return alert ("Вопросов нет");
        }
    }

    const newQuestionHandler = async () => {
        dispatch(newQuestion());
    }
    return(
        <>
        {data && 
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.askForm}>
                    <div className={styles.askBlock}>
                    {data.isAdmin ?<>
                        <div className={styles.askHeader}>
                            Вопросы от участников
                        </div>
                        <div className={styles.askBody}>
                            {qa ? <div className={styles.botResult}>
                                    {
                                        qa.map((item, index)=>(                                      
                                            <BotResult
                                                number = {index+1   }
                                                key={index}
                                                isAdmin = {true} 
                                                question ={item.question}
                                                answer ={item.userDiscord}
                                            />
                                        ))
                                    }
                                </div>: 
                                <input type="button" value="Получить все вопросы" className={styles.button} onClick={getQustions}/>
                            }
                                <form onSubmit = {handleSubmit(onQuestion)}>
                                    <div className={styles.askDescriptionAdmin}>
                                        Зарегистрировать вопрос в базе
                                        <div className={styles.asklabel}>Формулировка вопроса</div>
                                        <input type="text" name="question" placeholder="" className={styles.text} {...register('question', { required: true})}/>
                                        <div className={styles.asklabel}>Ответ на вопрос</div>
                                        <input type="text" name="answer" placeholder="" className={styles.text} {...register('answer', { required: true})}/>
                                        <input type="submit" value="Отправить" className={styles.button}/>
                                    </div>  
                                </form>
                        </div>
                    </> : <>
                    <div className={styles.askHeader}>
                            Задайте вопрос
                        </div>
                        <div className={styles.askBody}>
                            <div className={styles.askDescription}>
                                <strong>Что вас интересует?</strong> Наш бот попытается найти ответ на любой ваш вопрос, связанный с мероприятием, и немедленно вам его показать.
                                <br />
                                <br />
                                <strong>А если не сможет?</strong> В таком случае, придется немного подождать, пока ответ на ваш вопрос не даст администратор.
                                <br />
                                <br />
                                <strong>Как это работает?</strong> После того, как вы отправите вопрос, он попадет к боту. Тот, в свою очередь, выдаст вам похожие вопросы, но уже решенные. Вам останется только прочитать. Но если случится так, что бот не предоставит ничего, то вы сможете обратиться за помощью к админам
                            </div>
                            {qa ? <div className={styles.botResult}>
                                {
                                    qa.map((item, index)=>(                                      
                                        <BotResult
                                            key={index} 
                                            question ={item.question}
                                            answer ={item.answer}
                                        />
                                    ))
                                }
                                <input type="button" value="Задать другой вопрос" onClick={newQuestionHandler} className={styles.button}/>
                                <input type="button" value="Нет верного варианта" className={styles.button}/>
                            </div>:<>
                                <form onSubmit = {handleSubmit(onSubmit)}>
                                    <input type="text" name="question" placeholder="" {...register('question', { required: true})}/>
                                    <input type="submit" value="Отправить" className={styles.button}/>
                                </form>
                            </>}
                            
                        </div>
                    </> }
                    
                       

                    </div>
                </div>
            </div>
            
        </div>}
        
   </>
    );
    
}
