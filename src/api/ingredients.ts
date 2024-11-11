import { API_ENDPOINTS } from './endpoints';
import { IIngredient } from '../types/burger';
import { request } from './request';

interface IIngredientsResponse {
  data: IIngredient[];
  success: boolean
}

export const getIngredients = async (): Promise<IIngredientsResponse> => {
  return request<IIngredientsResponse>(API_ENDPOINTS.ingredients);
};
