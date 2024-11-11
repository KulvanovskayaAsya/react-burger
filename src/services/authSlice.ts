import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  register as registerRequest, 
  login as loginRequest, 
  logout as logoutRequest, 
  refreshToken as refreshTokenRequest,
  forgotPassword as forgotPasswordRequest,
  resetPassword as resetPasswordRequest
} from '../api/auth';
import { BaseSliceState, STATUS } from '../types/slices';

interface IUser {
  email: string;
  name: string;
}

interface IAuthState extends BaseSliceState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  successMessage: string;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: STATUS.IDLE,
  error: null,
  successMessage: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    return registerRequest({ email, password, name }).catch((error) => rejectWithValue(error.message));
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    return loginRequest({ email, password }).catch((error) => rejectWithValue(error.message));
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (token: string, { rejectWithValue }) => {
    return logoutRequest({ token }).catch((error) => rejectWithValue(error.message));
  }
);

export const refreshTokenAction = createAsyncThunk(
  'auth/refreshToken',
  async (token: string, { rejectWithValue }) => {
    return refreshTokenRequest({ token }).catch((error) => rejectWithValue(error.message));
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    return forgotPasswordRequest(email).catch((error) => rejectWithValue(error.message));
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, code }: { password: string; code: string }, { rejectWithValue }) => {
    return resetPasswordRequest(password, code).catch((error) => rejectWithValue(error.message));
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.successMessage = 'Регистрация успешна';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.successMessage = 'Авторизация успешна';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = STATUS.SUCCEEDED;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.successMessage = 'Выход из системы выполнен';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      })
      .addCase(refreshTokenAction.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshTokenAction.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccessMessage } = authSlice.actions;

export default authSlice.reducer;
