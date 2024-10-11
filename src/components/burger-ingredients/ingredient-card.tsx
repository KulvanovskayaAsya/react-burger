import React from 'react';
import { useDrag } from "react-dnd";
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/burger';
import { Price } from '../price/price';

interface IngredientCardProps {
  ingredient: Ingredient;
  count: number;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, count, onIngredientClick }) => {
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
