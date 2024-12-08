import React from 'react';
import FlexContainer from '@/layouts/flex-container/flex-container';
import styles from './orders-statistics.module.css';

export interface IOrdersStatisticsProps {
  title: string;
  value: number;
}

export const OrdersStatistics: React.FC<IOrdersStatisticsProps> = ({ title, value }) => {
  return (
    <FlexContainer flexDirection='column'>
      <p className={styles.title}>
        {title}
      </p>
      <p className={styles.value}>
        {value}
      </p>
    </FlexContainer>
  );
}
