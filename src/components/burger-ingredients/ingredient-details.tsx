import React from 'react';

import styles from './ingredient-details.module.css';
import { Ingredient } from '../../types/burger';

interface IngredientDetailsProps {
  ingredient: Ingredient;
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  const { image_large: image, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt={`Внешний вид ингредиента ${ingredient.name}`} />
      <h2 className={styles.title}>
        {name}
      </h2>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <p className={styles.infoCaption}>Калории,ккал</p>
          <p className={styles.infoCount}>{calories}</p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoCaption}>Белки, г</p>
          <p className={styles.infoCount}>{proteins}</p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoCaption}>Жиры, г</p>
          <p className={styles.infoCount}>{fat}</p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoCaption}>Углеводы, г</p>
          <p className={styles.infoCount}>{carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}
