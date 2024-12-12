import reducer, { 
  initialState, 
  fetchIngredients
} from '@/services/burger-ingredients-slice';
import { STATUS } from '@/types/slices';
import { IIngredient } from '@/types/burger';

const mockIngredients: IIngredient[] = [
  {
    _id: '1',
    name: 'Bun 1',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 1
  },
  {
    _id: '2',
    name: 'Sauce 1',
    type: 'sauce',
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 100,
    price: 20,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 2
  },
];

describe('Burger Ingredients reducer', () => {
  describe('initial state', () => {
    it('should be correct', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('fetchIngredients thunk', () => {
    it('should handle pending state', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        ingredients: mockIngredients,
      });
    });

    it('should handle rejected state', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Failed to fetch ingredients' },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: 'Failed to fetch ingredients',
      });
    });
  });
});
