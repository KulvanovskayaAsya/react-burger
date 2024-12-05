import React from 'react';
import styles from './orders-status.module.css';

interface IOrdersStatusProps {
  orders: { 
    number: number; 
    status: string 
  }[];
}

export const OrdersStatus: React.FC<IOrdersStatusProps> = ({ orders }) => {
  const maxItemsPerColumn = 10;

  const readyOrders = orders.filter((order) => order.status === 'done');
  const inProgressOrders = orders.filter((order) => order.status === 'inProgress');

  const splitIntoColumns = (orders: { number: number }[]) => {
    const columns = [];
    for (let i = 0; i < orders.length; i += maxItemsPerColumn) {
      columns.push(orders.slice(i, i + maxItemsPerColumn));
    }
    return columns;
  };

  const readyColumns = splitIntoColumns(readyOrders);
  const inProgressColumns = splitIntoColumns(inProgressOrders);

  return (
    <div className={styles.container}>
      <div className={styles.columnWrapper}>
        <h3 className={styles.title}>Готовы:</h3>
        <div className={styles.columns}>
          {readyColumns.map((column, colIndex) => (
            <ul key={colIndex} className={styles.column}>
              {column.map((order) => (
                <li key={order.number} className={styles.ready}>
                  {order.number}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className={styles.columnWrapper}>
        <h3 className={styles.title}>В работе:</h3>
        <div className={styles.columns}>
          {inProgressColumns.map((column, colIndex) => (
            <ul key={colIndex} className={styles.column}>
              {column.map((order) => (
                <li key={order.number}>{order.number}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
