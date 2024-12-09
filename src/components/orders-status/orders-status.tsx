import React from 'react';
import styles from './orders-status.module.css';
import { EOrderStatus } from '@/types/order';

interface IOrdersStatusProps {
  title: string;
  orders: number[];
  status: EOrderStatus;
}

export const OrdersStatus: React.FC<IOrdersStatusProps> = ({ title, orders, status }) => {
  const recentOrders = orders.slice(0, 16);

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
