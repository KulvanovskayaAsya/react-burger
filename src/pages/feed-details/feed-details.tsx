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
import FlexContainer from '@/layouts/flex-container/flex-container';
import OrderStatus from '@/components/order-status/order-status';

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
    <FlexContainer flexDirection='column' gap='16px'>
      <span className={styles.number}>#{order.number}</span>
      <h2 className={styles.name}>{order.name}</h2>
      <OrderStatus status={order.status} />
      <h3 className={styles.subtitle}>Состав:</h3>
      <ul className={styles.ingredientsList}>
        {orderIngredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <IngredientPreview image={ingredient.image} />
            <span className={styles.ingredientName}>{ingredient.name}</span>
            <Price className={styles.price} price={`${ingredient.quantity} x ${ingredient.price}`} />
          </li>
        ))}
      </ul>
      <FlexContainer justifyContent='space-between'>
        <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
        <Price price={totalPrice} />
      </FlexContainer>
    </FlexContainer>
  );
};
