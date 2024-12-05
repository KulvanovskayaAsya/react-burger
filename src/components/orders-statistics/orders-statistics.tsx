import React from 'react';
import styles from './orders-statistics.module.css';

export const OrdersStatistics: React.FC = () => {
  const total = 28752;
  const totalToday = 138;

  return (
    <div className={styles.statistics}>
      <div className={styles.total}>
        <h3>Выполнено за все время:</h3>
        <p className={styles.value}>{total}</p>
      </div>
      <div className={styles.today}>
        <h3>Выполнено за сегодня:</h3>
        <p className={styles.value}>{totalToday}</p>
      </div>
    </div>
  );
}
