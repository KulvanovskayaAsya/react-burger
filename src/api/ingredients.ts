import { INGREDIENTS_API_URL } from '../constants/api-constants';
import { Ingredient } from '../types/burger';

interface IngredientsResponse {
  data: Ingredient[];
  success: boolean
}

export const getIngredients = async (): Promise<IngredientsResponse> => {
  const response = await fetch(INGREDIENTS_API_URL);
  if (!response.ok) {
    throw new Error('Ошибка при получении ингредиентов');
  }
  const data = await response.json();
  return data;
};
