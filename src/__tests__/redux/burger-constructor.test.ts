import reducer, {
  initialState,
  clearConstructorIngredients,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  IConstructorIngredient,
} from '@/services/burger-constructor-slice';

import { IIngredient } from '@/types/burger';

jest.mock('@reduxjs/toolkit', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit');
  return {
    ...originalModule,
    nanoid: jest.fn(() => 'test-key'),
  };
});

const bun: IIngredient = {
  _id: 'bun-1',
  name: 'Test Bun',
  price: 50,
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 1
};

const ingredient1: IConstructorIngredient = {
  _id: 'ingredient-1',
  name: 'Ingredient 1',
  price: 20,
  key: 'key-1',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 1
};

const ingredient2: IConstructorIngredient = {
  _id: 'ingredient-2',
  name: 'Ingredient 2',
  price: 30,
  key: 'key-2',
  type: 'sauce',
  proteins: 5,
  fat: 2,
  carbohydrates: 10,
  calories: 30,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 2
};

describe('Burger Constructor reducer', () => {
  describe('initial state', () => {
    it('should be correct', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    it('should handle clearConstructorIngredients', () => {
      const previousState = {
        bun,
        ingredients: [ingredient1, ingredient2],
      };
      const state = reducer(previousState, clearConstructorIngredients());
      expect(state).toEqual(initialState);
    });

    it('should handle addBun', () => {
      const state = reducer(initialState, addBun(bun));
      expect(state).toEqual({
        ...initialState,
        bun,
      });
    });

    it('should handle addIngredient', () => {
      const state = reducer(initialState, addIngredient(ingredient1));
      expect(state).toEqual({
        ...initialState,
        ingredients: [{ ...ingredient1, key: 'test-key' }],
      });
    });

    it('should handle removeIngredient', () => {
      const previousState = {
        ...initialState,
        ingredients: [ingredient1, ingredient2],
      };
      const state = reducer(previousState, removeIngredient('key-1'));
      expect(state).toEqual({
        ...initialState,
        ingredients: [ingredient2],
      });
    });

    it('should handle moveIngredient', () => {
      const previousState = {
        ...initialState,
        ingredients: [ingredient1, ingredient2],
      };
      const action = {
        type: moveIngredient.type,
        payload: { fromIndex: 0, toIndex: 1 },
      };
      const state = reducer(previousState, action);
      expect(state).toEqual({
        ...initialState,
        ingredients: [ingredient2, ingredient1],
      });
    });
  });
});
