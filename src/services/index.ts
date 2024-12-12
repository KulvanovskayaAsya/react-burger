import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import orderReducer from './order-slice';
import authReducer from './auth-slice';
import feedReducer from './feed-slice';
import profileOrdersReducer from './profile-orders-slice';

import { 
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch, 
  useSelector as useReduxSelector
} from 'react-redux';
import { socketMiddleware } from '@/services/middleware/socket-middleware';

import * as FeedActions from '@/services/feed-slice';
import * as ProfileOrdersActions from '@/services/profile-orders-slice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

const feedWsActions = {
  connect: FeedActions.wsConnecting,
  disconnect: FeedActions.wsClose,
  onOpen: FeedActions.wsOpen,
  onClose: FeedActions.wsClose,
  onError: FeedActions.wsError,
  onMessage: FeedActions.wsMessage,
};

const profileOrdersWsActions = {
  connect: ProfileOrdersActions.wsConnecting,
  disconnect: ProfileOrdersActions.wsClose,
  onOpen: ProfileOrdersActions.wsOpen,
  onClose: ProfileOrdersActions.wsClose,
  onError: ProfileOrdersActions.wsError,
  onMessage: ProfileOrdersActions.wsMessage,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(
      socketMiddleware(feedWsActions), 
      socketMiddleware(profileOrdersWsActions)
    );
  }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
