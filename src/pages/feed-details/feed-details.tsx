import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services';
import { fetchOrderDetails } from '@/services/order-slice';

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '@/components/price/price';
import { selectIngredients } from '@/services/burger-ingredients-slice';
import { IIngredient } from '@/types/burger';

import styles from './feed-details.module.css';
import { IngredientPreview } from '@/components/ingredient-preview/ingredient-preview';

const statusMap: { [key: string]: string } = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

const statusColor: { [key: string]: string } = {
  done: styles.statusDone,
  pending: styles.statusPending,
  created: styles.statusCreated,
};

export const FeedDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const order = useSelector(state => {
    let order = state.feed.orders.find(o => o._id === id);
    if (order) {
      return order;
    }

    order = state.profileOrders.orders.find(o => o._id === id);
    if (order) {
      return order;
    }

    return state.order.orderDetails;
  });

  const ingredients = useSelector((state) => selectIngredients(state));

  const orderIngredients = useMemo(() => {
    if (!order) return [];
    const ingredientsCount: { [key: string]: number } = {};

    order.ingredients.forEach((id: string) => {
      ingredientsCount[id] = (ingredientsCount[id] || 0) + 1;
    });

    return Object.keys(ingredientsCount).map((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (!ingredient) return null;
      return {
        ...ingredient,
        quantity: ingredientsCount[id],
      };
    }).filter(Boolean) as (IIngredient & { quantity: number })[];
  }, [order, ingredients]);

  useEffect(() => {
    !order && id && dispatch(fetchOrderDetails(id));
  }, [order, id]);

  if (!order) return null;

  const totalPrice = orderIngredients.reduce(
    (total, ingredient) => total + ingredient.price * ingredient.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <span className={styles.number}>#{order.number}</span>
        <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
      </div>
      <h2 className={styles.name}>{order.name}</h2>
      <span className={`${styles.status} ${statusColor[order.status]}`}>
        {statusMap[order.status] || order.status}
      </span>
      <h3 className={styles.subtitle}>Состав:</h3>
      <ul className={styles.ingredientsList}>
        {orderIngredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <div className={styles.ingredientInfo}>
              <IngredientPreview image={ingredient.image} />
              <span className={styles.ingredientName}>{ingredient.name}</span>
            </div>
            <Price price={`${ingredient.quantity} x ${ingredient.price}`} />
          </li>
        ))}
      </ul>
      <div className={styles.totalContainer}>
        <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
        <Price price={totalPrice} />
      </div>
    </div>
  );
};
