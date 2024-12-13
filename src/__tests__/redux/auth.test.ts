import reducer, {
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUser,
  updateUser,
  clearError,
  clearSuccessMessage,
} from '@/services/auth-slice';
import { STATUS } from '@/types/slices';

describe('Auth reducer', () => {
  describe('initial state', () => {
    it('should be correct', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    it('should handle clearError', () => {
      const previousState = { ...initialState, error: 'error' };
      const newState = reducer(previousState, clearError());
      expect(newState).toEqual({ ...initialState, error: null });
    });

    it('should handle clearSuccessMessage', () => {
      const previousState = { ...initialState, successMessage: 'success' };
      const newState = reducer(previousState, clearSuccessMessage());
      expect(newState).toEqual({ ...initialState, successMessage: '' });
    });
  });

  describe('registerUser thunk', () => {
    it('should handle pending state', () => {
      const action = { type: registerUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user: { id: '1', name: 'Test User', email: 'test@example.com' },
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        successMessage: 'Регистрация успешна',
      });
    });

    it('should handle rejected state', () => {
      const action = { type: registerUser.rejected.type, payload: 'Registration failed' };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: action.payload,
      });
    });
  });

  describe('loginUser thunk', () => {
    it('should handle pending state', () => {
      const action = { type: loginUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user: { id: '1', name: 'Test User', email: 'test@example.com' },
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        successMessage: 'Авторизация успешна',
      });
    });

    it('should handle rejected state', () => {
      const action = { type: loginUser.rejected.type, payload: 'Login failed' };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: action.payload,
      });
    });
  });

  describe('logoutUser thunk', () => {
    it('should handle pending state', () => {
      const action = { type: logoutUser.pending.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const previousState = {
        ...initialState,
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      const action = { type: logoutUser.fulfilled.type };
      const newState = reducer(previousState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        successMessage: 'Выход из системы выполнен',
      });
    });

    it('should handle rejected state', () => {
      const action = { type: logoutUser.rejected.type, payload: 'Logout failed' };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: action.payload,
      });
    });
  });

  describe('refreshToken thunk', () => {
    it('should handle pending state', () => {
      const action = { type: refreshToken.pending.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.LOADING,
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: refreshToken.fulfilled.type,
        payload: {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        },
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.SUCCEEDED,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    });

    it('should handle rejected state', () => {
      const action = { type: refreshToken.rejected.type, payload: 'Refresh failed' };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        status: STATUS.FAILED,
        error: action.payload,
      });
    });
  });

  describe('getUser thunk', () => {
    it('should handle fulfilled state', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { id: '1', name: 'Test User', email: 'test@example.com' },
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        user: action.payload,
        isAuthChecked: true,
      });
    });

    it('should handle rejected state', () => {
      const action = { type: getUser.rejected.type };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
      });
    });
  });

  describe('updateUser thunk', () => {
    it('should handle fulfilled state', () => {
      const previousState = {
        ...initialState,
        user: { id: '1', name: 'Old Name', email: 'old@example.com' },
      };
  
      const action = {
        type: updateUser.fulfilled.type,
        payload: { id: '1', name: 'Updated Name', email: 'updated@example.com' },
      };
  
      const newState = reducer(previousState, action);
  
      expect(newState).toEqual({
        ...initialState,
        user: action.payload,
        successMessage: 'Данные успешно обновлены',
      });
    });
  });
});
