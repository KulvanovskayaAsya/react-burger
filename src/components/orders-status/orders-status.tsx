import React from 'react';
import styles from './orders-status.module.css';

interface IOrdersStatusProps {
  title: string;
  orders: number[];
  status: 'done' | 'pending' | 'created';
}

export const OrdersStatus: React.FC<IOrdersStatusProps> = ({ title, orders, status }) => {
  const recentOrders = orders.slice(0, 20);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <ul className={`${styles.columns} ${styles[status]}`}>
        {recentOrders.map((order) => (
          <li key={order} className={styles.order}>
            {order}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersStatus;
