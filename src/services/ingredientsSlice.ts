import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from '../api/ingrediets';
import { Ingredient } from '../types/burger';
import { BaseSliceState, STATUS } from '../types/slices';
import { RootState } from '.';

interface IngredientsState extends BaseSliceState {
  ingredients: Ingredient[] | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  status: STATUS.IDLE,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message || 'Не удалось получить ингредиенты';
      });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: RootState) => state.burgerIngredients.ingredients;
export const selectIngredientsStatus = (state: RootState) => state.burgerIngredients.status;
export const selectIngredientById = (id: string) =>
  createSelector(selectIngredients, (ingredients) =>
    ingredients ? ingredients.find((ingredient: Ingredient) => ingredient._id === id) : null
  );

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await getIngredients();
  return response.data;
});
