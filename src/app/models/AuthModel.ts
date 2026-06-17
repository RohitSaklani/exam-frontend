export interface AuthModel {
  accessToken: string;
  role: string;
  tokenType: string;
  expiresOn: string;
}

export interface LoginModel {
  username: String;
  password: String;
}
