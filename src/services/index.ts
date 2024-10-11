import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burgerIngredientsSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
