import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';

import { Ingredient } from '../../types/burger';

import commonStyles from '../../common.module.css';
import styles from './home-page.module.css';
import { selectIngredients, selectIngredientsStatus } from '../../services/ingredientsSlice';
import { STATUS } from '../../types/slices';

export const HomePage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const ingredients = useSelector(selectIngredients);
  const status = useSelector(selectIngredientsStatus);

  const handleAddIngredient = useCallback((ingredient: Ingredient) => {
    if (ingredient.type === 'bun') {
      setSelectedIngredients(prev => [
        ingredient,
        ...prev.filter(item => item.type !== 'bun'),
        ingredient
      ]);
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  }, []);

  const countIngredients = (ingredients: Ingredient[], ingredientId: string): number => {
    return ingredients.filter(item => item._id === ingredientId).length;
  };

  if (status === STATUS.LOADING) {
    return <p>Да, вы голодны, ингредиенты уже летят к вам...</p>;
  }

  if (status === STATUS.FAILED) {
    return <p>Ой, похоже кто-то украл все ингредиенты, уже разбираемся</p>;
  }

  // if (status === STATUS.SUCCEEDED && ingredients && ingredients.length > 0) {
    // const ingredientCounts = ingredients.reduce((acc, item) => {
    //   acc[item._id] = countIngredients(selectedIngredients, item._id);
    //   return acc;
    // }, {} as { [key: string]: number });

    return (
      <main className={commonStyles.mainContainer}>
        <h1 className={styles.pageTitle}>Соберите бургер</h1>
        <div className={commonStyles.flexContainer}>
          <div className={commonStyles.flexHalfChild}>
            <BurgerIngredients />
          </div>
          <div className={commonStyles.flexHalfChild}>
            <BurgerConstructor ingredients={selectedIngredients} />
          </div>
        </div>
      </main>
    );
  }

  return null;
}
