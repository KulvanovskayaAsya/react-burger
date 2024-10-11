import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../types/burger';
import { RootState } from '.';

interface IngredientDetailsState {
  selectedIngredient: Ingredient | null;
}

const initialState: IngredientDetailsState = {
  selectedIngredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export default ingredientDetailsSlice.reducer;

export const selectSelectedIngredient = (state: RootState) => state.ingredientDetails.selectedIngredient;

export const { setSelectedIngredient, clearSelectedIngredient } = ingredientDetailsSlice.actions;


