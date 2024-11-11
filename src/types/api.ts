export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

export interface ITokenRefreshRequest {
  token: string;
}

export interface ITokenRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutRequest {
  token: string;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface IUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
