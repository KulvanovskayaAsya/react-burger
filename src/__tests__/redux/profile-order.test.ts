import reducer, {
  initialState,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from '@/services/profile-orders-slice';
import { IFeed } from '@/types/feed';
import { EOrderStatus, IOrder } from '@/types/order';

const mockOrders: IOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient-1', 'ingredient-2'],
    status: EOrderStatus.Done,
    name: 'Test Order 1',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-01',
    number: 101,
  },
  {
    _id: '2',
    ingredients: ['ingredient-3', 'ingredient-4'],
    status: EOrderStatus.Pending,
    name: 'Test Order 2',
    createdAt: '2023-12-02',
    updatedAt: '2023-12-02',
    number: 102,
  },
];

const mockFeed: IFeed = {
  orders: mockOrders,
  total: 100,
  totalToday: 10,
  success: true
};

describe('Profile Orders reducer', () => {
  describe('initial state', () => {
    it('should be correct', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    it('should handle wsConnecting', () => {
      const action = { type: wsConnecting.type, payload: 'Connecting...' };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isConnected: false,
        error: null,
      });
    });

    it('should handle wsOpen', () => {
      const state = reducer(initialState, wsOpen());
      expect(state).toEqual({
        ...initialState,
        isConnected: true,
      });
    });

    it('should handle wsClose', () => {
      const previousState = {
        ...initialState,
        isConnected: true,
      };
      const state = reducer(previousState, wsClose());
      expect(state).toEqual({
        ...initialState,
        isConnected: false,
      });
    });

    it('should handle wsError', () => {
      const action = { type: wsError.type, payload: 'Connection error' };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'Connection error',
      });
    });

    it('should handle wsMessage', () => {
      const action = { type: wsMessage.type, payload: mockFeed };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday,
      });
    });
  });
});
