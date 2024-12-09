import React from 'react';

import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '@/services';
import { RootState } from '@/services';
import { selectIngredientById } from '@/services/burger-ingredients-slice';

export const IngredientDetails: React.FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredient = useSelector((state: RootState) => selectIngredientById(state, ingredientId!));

  if (!ingredient) return null;

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
