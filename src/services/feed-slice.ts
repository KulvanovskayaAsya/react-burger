import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IFeed } from '@/types/feed';

interface IFeedState {
  orders: IOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnecting(state, action: PayloadAction<string>) {
      state.isConnected = false;
      state.error = null;
    },
    wsOpen(state) {
      state.isConnected = true;
    },
    wsClose(state) {
      state.isConnected = false;
    },
    wsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    wsMessage(state, action: PayloadAction<IFeed>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = feedSlice.actions;

export default feedSlice.reducer;
