import { API_ENDPOINTS } from './endpoints';
import { IIngredient } from '@/types/burger';
import { request } from './request';
import { IFeed } from '@/types/feed';

interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IOrderDetailsResponse extends IFeed {}

export const postOrder = async (orderIngredients: IIngredient[]): Promise<IOrderResponse> => {
  const ingredientIds = orderIngredients.map(ingredient => ingredient._id);

  return request<IOrderResponse>(API_ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });
};

export const fetchOrderById = async (orderId: string): Promise<IOrderDetailsResponse> => {
  return request<IOrderDetailsResponse>(`${API_ENDPOINTS.orders}/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
  });
};
