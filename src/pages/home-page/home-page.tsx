import { useCallback, useState } from 'react';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { getIngredientsUrl } from '../../constants/api-constants';
import { useFetch } from '../../hooks/useFetch';
import { Ingredient, IngredientsData } from '../../types/burger';

import commonStyles from '../../common.module.css';
import styles from './home-page.module.css';

export const HomePage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  
  const { loading, error, data } = useFetch<IngredientsData>(getIngredientsUrl);

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

  if (loading) {
    return <p>Да, вы голодны, ингридиенты уже летят к вам...</p>;
  }

  if (error) {
    return <p>Ой, похоже кто-то украл все ингридиенты, уже разбираемся</p>;
  }

  if (data && data.success && data.data.length > 0) {
    const { data: ingredients } = data;

    const ingredientCounts = ingredients.reduce((acc, item) => {
      acc[item._id] = countIngredients(selectedIngredients, item._id);
      return acc;
    }, {} as { [key: string]: number });

    return (
      <main className={commonStyles.mainContainer}>
        <h1 className={styles.pageTitle}>Соберите бургер</h1>
        <div className={commonStyles.flexContainer}>
          <div className={commonStyles.flexHalfChild}>
            <BurgerIngredients 
              ingredients={ingredients}
              ingredientCounts={ingredientCounts}
              onAddIngredient={handleAddIngredient}
            />
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
