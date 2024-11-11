import { request } from './request';

interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface IRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

interface ITokenRefreshRequest {
  token: string;
}

interface ITokenRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

interface ILogoutRequest {
  token: string;
}

interface ILogoutResponse {
  success: boolean;
  message: string;
}

export const register = async ({ email, password, name }: IRegisterRequest) => {
  return request<IRegisterResponse>(
    'https://norma.nomoreparties.space/api/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    }
  );
};

export const login = async ({ email, password }: ILoginRequest) => {
  return request<ILoginResponse>(
    'https://norma.nomoreparties.space/api/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );
};

export const logout = async ({ token }: ILogoutRequest) => {
  return request<ILogoutResponse>(
    'https://norma.nomoreparties.space/api/auth/logout',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }
  );
};

export const refreshToken = async ({ token }: ITokenRefreshRequest) => {
  return request<ITokenRefreshResponse>(
    'https://norma.nomoreparties.space/api/auth/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }
  );
};

export const forgotPassword = async (email: string) => {
  return request<IResetPasswordResponse>(
    'https://norma.nomoreparties.space/api/password-reset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );
};

export const resetPassword = async (password: string, token: string) => {
  return request<IResetPasswordResponse>(
    'https://norma.nomoreparties.space/api/password-reset/reset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    }
  );
};
