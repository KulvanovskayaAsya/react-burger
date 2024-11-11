import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '../api/order';
import { IIngredient } from '../types/burger';
import { IBaseSliceState, STATUS } from '../types/slices';
import { RootState } from '.';

interface IOrderState extends IBaseSliceState {
  orderNumber: number | null;
}

const initialState: IOrderState = {
  status: STATUS.IDLE,
  error: null,
  orderNumber: null,
};

export const submitOrder = createAsyncThunk(
  'order/submitOrder', 
  async (ingredients: IIngredient[]) => {
    const response = await postOrder(ingredients);
    return response.order.number;
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
      });
  }
})

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrderNumber = (state: RootState) => state.order.orderNumber;
export const selectOrderStatus = (state: RootState) => state.order.status;
