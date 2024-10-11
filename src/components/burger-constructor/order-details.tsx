import { useSelector } from 'react-redux';

import { selectOrderNumber } from '../../services/orderSlice';

import doneImgPath from '../../images/done.svg';
import styles from './order-details.module.css';

export const OrderDetails = () => {
  const orderNumber = useSelector(selectOrderNumber);
  
  return (
    <div className={styles.container}>
      <h2 className={styles.number}>{orderNumber}</h2>
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
