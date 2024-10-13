import React from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';

import { selectIngredientCount } from '../../services/burgerConstructorSlice';
import { RootState } from '../../services';

import { Ingredient } from '../../types/burger';

import styles from './ingredient-card.module.css';

interface IngredientCardProps {
  ingredient: Ingredient;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onIngredientClick }) => {
  const count = useSelector((state: RootState) => selectIngredientCount(state, ingredient._id, ingredient.type));
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  const handleClick = () => {
    onIngredientClick(ingredient);
  };

  return (
    <article
      className={styles.card}
      ref={dragRef}
      onClick={handleClick}
    >
      <img className={styles.cardImage} src={ingredient.image} alt={`Внешний вид ингредиента ${ingredient.name}`} />
      <Price price={ingredient.price} />
      <p className={styles.cardTitle}>
        {ingredient.name}
      </p>
      {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
    </article>
  );
}
