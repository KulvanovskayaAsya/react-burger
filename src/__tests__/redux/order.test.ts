import reducer, {
  initialState,
  submitOrder,
  fetchOrderDetails,
  clearOrder,
} from '@/services/order-slice';

import { STATUS } from '@/types/slices';
import { EOrderStatus, IOrder } from '@/types/order';

const mockOrderDetails: IOrder = {
  _id: 'order-1',
  ingredients: ['ingredient-1', 'ingredient-2'],
  status: EOrderStatus.Done,
  name: 'Test Order',
  createdAt: '2023-12-01',
  updatedAt: '2023-12-01',
  number: 1234,
};

describe('Order reducer', () => {
  describe('initial state', () => {
    it('should be correct', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    it('should handle clearOrder', () => {
      const previousState = {
        ...initialState,
        orderNumber: 1234,
        status: STATUS.SUCCEEDED,
        error: 'Some error',
      };
      const state = reducer(previousState, clearOrder());
      expect(state).toEqual(initialState);
    });
  });

  describe('submitOrder thunk', () => {
    it('should handle pending state', () => {
      const action = { type: submitOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = { type: submitOrder.fulfilled.type, payload: 1234 };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        orderNumber: 1234,
      });
    });

    it('should handle rejected state', () => {
      const action = {
        type: submitOrder.rejected.type,
        error: { message: 'Failed to submit order' },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: 'Failed to submit order',
      });
    });
  });

  describe('fetchOrderDetails thunk', () => {
    it('should handle pending state', () => {
      const action = { type: fetchOrderDetails.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
        orderDetails: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = { type: fetchOrderDetails.fulfilled.type, payload: [mockOrderDetails] };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        orderDetails: mockOrderDetails,
      });
    });

    it('should handle rejected state', () => {
      const action = {
        type: fetchOrderDetails.rejected.type,
        payload: 'Failed to fetch order details',
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: 'Failed to fetch order details',
      });
    });
  });
});
