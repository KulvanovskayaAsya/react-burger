import styles from './order-details.module.css';
import doneImgPath from '../../images/done.svg';

export const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.number}>034546</h2>
      <p className={styles.numberCaption}>идентификатор заказа</p>
      <img className={styles.doneImage} src={doneImgPath} />
      <p className={styles.orderProgress}>
        Ваш заказ начали готовить
      </p>
      <p className={styles.orderCaption}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
