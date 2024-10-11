import { INGREDIENTS_API_URL } from '../constants/api-constants';
import { IngredientsData } from '../types/burger';

export const getIngredients = async () => {
  const response = await fetch(INGREDIENTS_API_URL);
  if (!response.ok) {
    throw new Error('Ошибка при получении ингредиентов');
  }
  const data: IngredientsData = await response.json();
  return data;
};
