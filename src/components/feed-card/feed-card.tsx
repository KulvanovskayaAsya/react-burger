import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './feed-card.module.css';
import { IIngredient } from '../../types/burger';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import OrderIngredients from '../order-ingredients/order-ingredients';

export interface IFeedProps {
  number: number;
  ingredients: IIngredient[];
  date: Date;
  price: number;
  status?: string;
  linkTo: string;
}

export const FeedCard: React.FC<IFeedProps> = ({ number, ingredients, date, price, status, linkTo }) => {
  const location = useLocation();

  const ingredientsImages = ingredients.map(i => i.image);
  const burgerName = ingredients.map(i => i.name).join(' ');

  return (
    <Link
      to={linkTo}
      state={{ background: location }}
      className={styles.link}
    >
      <article className={styles.card}>
        <div className={styles.flexContainer}>
          <span className={styles.number}>#{number}</span>
          <FormattedDate className={styles.date} date={date} />
        </div>
        <h2 className={styles.name}>{burgerName}</h2>
        {status && <span>{status}</span>}
        <OrderIngredients ingredients={ingredientsImages} />
        <Price price={price} />
      </article>
    </Link>
  );
};
