import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  register as registerRequest,
  login as loginRequest,
  logout as logoutRequest,
  refreshToken as refreshTokenRequest,
  forgotPassword as forgotPasswordRequest,
  resetPassword as resetPasswordRequest,
  getUser as getUserRequest,
  updateUser as updateUserRequest,
} from '@/api/auth';
import { IBaseSliceState, STATUS } from '@/types/slices';
import { RootState } from '.';
import { IUser } from '@/types/api';

interface IAuthState extends IBaseSliceState {
  user: IUser | null;
  isAuthChecked: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  successMessage: string;
}

const initialState: IAuthState = {
  user: null,
  isAuthChecked: false,
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

export const refreshToken = createAsyncThunk(
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

export const getUser = createAsyncThunk(
  'auth/getUserData',
  async () => {
    const response = await getUserRequest();
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUserData',
  async ({ name, email, password }: { name: string; email: string, password: string }) => {
    const response = await updateUserRequest(name, email, password);
    return response.user;
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

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
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

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
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

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
        state.isAuthChecked = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.successMessage = 'Данные успешно обновлены';
      });
  },
});

export const { clearError, clearSuccessMessage } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
