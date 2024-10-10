import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from './types';
import { Ingredient } from '../../types/burger';

interface ConstructorState extends SliceState<Ingredient[]> {}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  data: [],
  status: 'idle',
  error: null,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.data?.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.data = state.data?.filter((ingredient) => ingredient._id !== action.payload);
    },
  },
});

export const { addIngredient, removeIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
