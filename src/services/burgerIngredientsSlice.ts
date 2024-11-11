import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getIngredients } from '../api/ingredients';
import { IIngredient } from '../types/burger';
import { IBaseSliceState, STATUS } from '../types/slices';
import { RootState } from '.';

interface IIngredientsState extends IBaseSliceState {
  ingredients: IIngredient[];
}

const initialState: IIngredientsState = {
  ingredients: [],
  status: STATUS.IDLE,
  error: null,
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await getIngredients();
  return response.data;
});

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
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

export default burgerIngredientsSlice.reducer;

export const selectIngredients = (state: RootState) => state.burgerIngredients.ingredients;
export const selectIngredientsStatus = (state: RootState) => state.burgerIngredients.status;

export const selectIngredientsByType = createSelector(
  [selectIngredients, (_: RootState, type: string) => type],
  (ingredients, type) => ingredients?.filter((ingredient) => ingredient.type === type)
);
