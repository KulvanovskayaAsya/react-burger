import { ORDERS_API_URL } from '../constants/api-constants';
import { Ingredient } from '../types/burger';

interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = async (orderIngredients: Ingredient[]): Promise<OrderResponse> => {
  const ingredientIds = orderIngredients.map(ingredient => ingredient._id);

  const response = await fetch(ORDERS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении ингредиентов');
  }

  const data = await response.json();
  return data;
};
