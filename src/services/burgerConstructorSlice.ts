import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/burger';
import { RootState } from '.';

interface burgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}
const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients?.filter((ingredient) => ingredient._id !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    },
  },
});

export const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectIngredients = (state: RootState) => state.burgerConstructor.ingredients;
