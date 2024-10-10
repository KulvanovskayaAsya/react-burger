import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
