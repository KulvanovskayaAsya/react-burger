import React from 'react';
import styles from './order-ingredients.module.css';
import { IngredientPreview } from '../ingredient-preview/ingredient-preview';

type OrderIngredientsProps = {
  ingredients: string[];
};

const OrderIngredients: React.FC<OrderIngredientsProps> = ({ ingredients }) => {
  const visibleIngredients = ingredients.slice(0, 5);
  const extraCount = ingredients.length > 5 ? ingredients.length - 5 : 0;

  return (
    <div className={styles.container}>
      {visibleIngredients.map((image, index) => (
        <div
          key={index}
          className={styles.ingredient}
          style={{ zIndex: visibleIngredients.length - index }}
        >
          <IngredientPreview key={index} image={image} />
        </div>
      ))}
      {extraCount > 0 && (
        <IngredientPreview
          image={ingredients[5]}
          extraCount={extraCount}
          style={{ zIndex: 0 }}
        />
      )}
    </div>
  );
};

export default OrderIngredients;
