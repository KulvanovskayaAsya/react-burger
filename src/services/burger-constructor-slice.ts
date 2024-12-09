import { createSlice, PayloadAction, nanoid, createSelector } from '@reduxjs/toolkit';
import { IIngredient } from '@/types/burger';
import { RootState } from '.';

type IConstructorIngredient = IIngredient & { key: string };

interface IBurgerConstructorState {
  bun: IIngredient | null;
  ingredients: Array<IConstructorIngredient>;
}
const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    clearConstructorIngredients: state => {
      state.bun = null;
      state.ingredients = [];
    },
    addBun: (state, action: PayloadAction<IIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, key: nanoid() } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients?.filter((ingredient) => ingredient.key !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    },
  },
});

export const { clearConstructorIngredients, addIngredient, addBun, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectIngredients = (state: RootState) => state.burgerConstructor.ingredients;
export const selectIngredientCount = createSelector(
  (state: RootState) => state.burgerConstructor.bun,
  (state: RootState) => state.burgerConstructor.ingredients,
  (_: RootState, ingredientId: string, type: string) => ({ ingredientId, type }),
  (bun, ingredients, { ingredientId, type }) => {
    if (type === 'bun') {
      return bun && bun._id === ingredientId ? 2 : 0;
    } else {
      return ingredients.filter(item => item._id === ingredientId).length;
    }
  }
);
export const selectTotalPrice = createSelector(
  (state: RootState) => state.burgerConstructor.bun,
  (state: RootState) => state.burgerConstructor.ingredients,
  (bun, ingredients) => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((total, ingredient) => total + ingredient.price, 0);

    return bunPrice + ingredientsPrice;
  }
)
