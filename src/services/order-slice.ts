import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrderById, postOrder } from '@/api/order';
import { IBaseSliceState, STATUS } from '@/types/slices';
import { RootState } from '.';
import { IOrder } from '@/types/order';
import { IIngredient } from '@/types/burger';

interface IOrderState extends IBaseSliceState {
  orderNumber: number | null;
  orderDetails: IOrder | null;
}

export const initialState: IOrderState = {
  status: STATUS.IDLE,
  error: null,
  orderNumber: null,
  orderDetails: null,
};

export const submitOrder = createAsyncThunk(
  'order/submitOrder', 
  async (ingredients: IIngredient[]) => {
    const response = await postOrder(ingredients);
    return response.order.number;
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetchOrderById(orderId);
      return response.orders;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Не удалось получить данные заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: state => {
      state.orderNumber = null;
      state.status = STATUS.IDLE;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orderNumber = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message || 'Не удалось отправить заказ';
      })

      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
        state.orderDetails = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orderDetails = action.payload[0];
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      });
  }
})

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrderNumber = (state: RootState) => state.order.orderNumber;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderDetails = (state: RootState) => state.order.orderDetails;
