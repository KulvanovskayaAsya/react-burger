import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '@/types/burger';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '@/components/price/price';
import OrderIngredients from '@/components/order-ingredients/order-ingredients';

import styles from './feed-card.module.css';
import commonStyles from '@/common.module.css';
import FlexContainer from '@/layouts/flex-container/flex-container';

export interface IFeedProps {
  number: number;
  ingredients: Array<IIngredient & { quantity: number }>;
  date: Date;
  price: number;
  status?: string;
  linkTo: string;
  name: string;
}

export const FeedCard: React.FC<IFeedProps> = ({ number, ingredients, date, price, status, name, linkTo }) => {
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
        {status && <span>{status}</span>}
        <FlexContainer justifyContent='space-between'>
          <OrderIngredients ingredients={ingredientsImages} />
          <Price price={price} />
        </FlexContainer>
      </article>
    </Link>
  );
};
