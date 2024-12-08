import { useSelector } from '@/services';

import { selectOrderNumber, selectOrderStatus } from '@/services/order-slice'

import doneImgPath from '@/assets/done.svg';
import styles from './order-details.module.css';
import { Loader } from '@/components/loader/loader';
import { STATUS } from '@/types/slices';

export const OrderDetails = () => {
  const orderNumber = useSelector(selectOrderNumber);
  const orderStatus = useSelector(selectOrderStatus);
  
  return (
    <div className={styles.container}>
      {orderStatus === STATUS.LOADING ? (
        <>
        <Loader size={120}/>
        <p className={styles.orderProgress}>
          Ваш заказ оформляется, пожалуйста, подождите
        </p>
        </>
      ) : (
        <>
          <h2 className={styles.number}>{orderNumber}</h2>
          <p className={styles.numberCaption}>идентификатор заказа</p>
    
          <img className={styles.doneImage} src={doneImgPath} />
          <p className={styles.orderProgress}>
            Ваш заказ начали готовить
          </p>
          <p className={styles.orderCaption}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  )
}
