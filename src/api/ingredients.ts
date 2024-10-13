import { INGREDIENTS_API_URL } from '../constants/api-constants';
import { Ingredient } from '../types/burger';
import { request } from './request';

interface IngredientsResponse {
  data: Ingredient[];
  success: boolean
}

export const getIngredients = async (): Promise<IngredientsResponse> => {
  return request<IngredientsResponse>(INGREDIENTS_API_URL);
};
