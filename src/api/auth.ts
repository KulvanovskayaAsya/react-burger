import { 
  ILoginRequest, 
  ILoginResponse, 
  ILogoutRequest, 
  ILogoutResponse, 
  IRegisterRequest, 
  IRegisterResponse, 
  IResetPasswordResponse, 
  ITokenRefreshRequest,
  ITokenRefreshResponse, 
  IUserResponse
} from '../types/api';
import { API_ENDPOINTS } from './endpoints';
import { request } from './request';

export const register = async ({ email, password, name }: IRegisterRequest): Promise<IRegisterResponse> => {
  return request<IRegisterResponse>(API_ENDPOINTS.auth.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
};

export const login = async ({ email, password }: ILoginRequest): Promise<ILoginResponse> => {
  return request<ILoginResponse>(API_ENDPOINTS.auth.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async ({ token }: ILogoutRequest): Promise<ILogoutResponse> => {
  return request<ILogoutResponse>(API_ENDPOINTS.auth.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};

export const refreshToken = async ({ token }: ITokenRefreshRequest): Promise<ITokenRefreshResponse> => {
  return request<ITokenRefreshResponse>(API_ENDPOINTS.auth.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};

export const forgotPassword = async (email: string): Promise<IResetPasswordResponse> => {
  return request<IResetPasswordResponse>(API_ENDPOINTS.password.forgot, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (password: string, token: string): Promise<IResetPasswordResponse> => {
  return request<IResetPasswordResponse>(API_ENDPOINTS.password.reset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });
};

export const getUser = async (): Promise<IUserResponse> => {
  return request<IUserResponse>(API_ENDPOINTS.auth.user, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
  });
};

export const updateUser = async (name: string, email: string): Promise<IUserResponse> => {
  return request<IUserResponse>(API_ENDPOINTS.auth.user, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify({ name, email }),
  });
};
