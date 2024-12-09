import React from 'react';
import styles from './order-status.module.css';
import { EOrderStatus } from '@/types/order';

interface IOrderStatusProps {
  status: EOrderStatus;
}

const statusMap: { [key: string]: string } = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const OrderStatus: React.FC<IOrderStatusProps> = ({ status }) => {
  return <span className={`${styles.status} ${styles[status]}`}>{statusMap[status]}</span>;
};

export default OrderStatus;
