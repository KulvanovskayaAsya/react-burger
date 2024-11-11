import { API_ENDPOINTS } from './endpoints';
import { IIngredient } from '../types/burger';
import { request } from './request';

interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = async (orderIngredients: IIngredient[]): Promise<IOrderResponse> => {
  const ingredientIds = orderIngredients.map(ingredient => ingredient._id);

  return request<IOrderResponse>(API_ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });
};
