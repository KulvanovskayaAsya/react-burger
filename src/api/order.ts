import { ORDERS_API_URL } from '../constants/api-constants';
import { Ingredient } from '../types/burger';
import { request } from './request';

interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = async (orderIngredients: Ingredient[]): Promise<OrderResponse> => {
  const ingredientIds = orderIngredients.map(ingredient => ingredient._id);

  return request<OrderResponse>(ORDERS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });
};
