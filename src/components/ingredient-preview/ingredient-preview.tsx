import React from 'react';
import styles from './ingredient-preview.module.css';

type IngredientPreviewProps = {
  image: string;
  extraCount?: number;
};

export const IngredientPreview: React.FC<IngredientPreviewProps> = ({ image, extraCount, ...props }) => {
  return (
    <div className={styles.ingredientPreview}>
      <img src={image} alt="ingredient" className={styles.ingredientImage} />
      {extraCount && (
        <div className={styles.extraCount} {...props}>
          +{extraCount}
        </div>
      )}
    </div>
  );
};
