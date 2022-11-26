import styles from './BotResult.module.css'

export const BotResult = ({question, answer, isAdmin = false, number = 0}) => {
  console.log(question)
    return (<>
      {isAdmin ?        
      <div className={styles.result}>
        <div className={styles.question}>{number}. {question}</div>
        <div className={styles.answer}>Вопрос задал: {answer}</div>
      </div> : 
      <div className={styles.result}>
        <div className={styles.question}>{question}:</div>
         {answer}
      </div>}
      </>
    )
}