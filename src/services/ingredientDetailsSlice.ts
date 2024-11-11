import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../types/burger';
import { RootState } from '.';

interface IIngredientDetailsState {
  selectedIngredient: IIngredient | null;
}

const initialState: IIngredientDetailsState = {
  selectedIngredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<IIngredient>) => {
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


