import React from 'react';

import styles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  image: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ image, name, calories, proteins, fat, carbohydrates }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
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
