import React from 'react';
import { useSelector } from '@/services';
import { useDrag } from 'react-dnd';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '@/components/price/price';

import { selectIngredientCount } from '@/services/burger-constructor-slice';
import { RootState } from '@/services';

import { IIngredient } from '@/types/burger';

import styles from './ingredient-card.module.css';
import { Link, useLocation } from 'react-router-dom';

interface IIngredientCardProps {
  ingredient: IIngredient;
}

export const IngredientCard: React.FC<IIngredientCardProps> = ({ ingredient }) => {
  const location = useLocation();

  const count = useSelector((state: RootState) => selectIngredientCount(state, ingredient._id, ingredient.type));
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  return (
    <Link
      key={ingredient._id}
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <article
        className={styles.card}
        ref={dragRef}
      >
        <img className={styles.cardImage} src={ingredient.image} alt={`Внешний вид ингредиента ${ingredient.name}`} />
        <Price price={ingredient.price} />
        <p className={styles.cardTitle}>
          {ingredient.name}
        </p>
        {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
      </article>
    </Link>
  );
}
