import React from 'react';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types/burger';
import { Price } from '../price/price';

interface IngredientCardProps {
  ingredient: Ingredient;
  count: number;
  onAddIngredient: (ingredient: Ingredient) => void;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const IngridientCard: React.FC<IngredientCardProps> = ({ ingredient, count, onAddIngredient, onIngredientClick }) => {
  const handleClick = () => {
    onAddIngredient(ingredient);
    onIngredientClick(ingredient);
  };

  return (
    <article 
      className={styles.card}
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
