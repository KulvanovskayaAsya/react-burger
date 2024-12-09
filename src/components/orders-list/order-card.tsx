import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '@/types/burger';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '@/components/price/price';
import OrderIngredients from '@/components/order-ingredients/order-ingredients';

import styles from './order-card.module.css';
import commonStyles from '@/common.module.css';
import FlexContainer from '@/layouts/flex-container/flex-container';
import OrderStatus from '@/components/order-status/order-status';
import { EOrderStatus } from '@/types/order';

export interface IOrderCardProps {
  number: number;
  ingredients: Array<IIngredient & { quantity: number }>;
  date: Date;
  price: number;
  status?: EOrderStatus;
  linkTo: string;
  name: string;
}

export const OrderCard: React.FC<IOrderCardProps> = ({ number, ingredients, date, price, status, name, linkTo }) => {
  const location = useLocation();

  const ingredientsImages = ingredients.map(i => i.image);

  return (
    <Link
      to={linkTo}
      state={{ background: location }}
      className={commonStyles.link}
    >
      <article className={styles.card}>
        <div className={styles.flexContainer}>
          <span className={styles.number}>#{number}</span>
          <FormattedDate className={styles.date} date={date} />
        </div>
        <h2 className={styles.name}>{name}</h2>
        {status && <OrderStatus status={status} />}
        <FlexContainer justifyContent='space-between'>
          <OrderIngredients ingredients={ingredientsImages} />
          <Price price={price} />
        </FlexContainer>
      </article>
    </Link>
  );
};
