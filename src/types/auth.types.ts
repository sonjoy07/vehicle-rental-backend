export interface Staff {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  email: string;
}

export interface LoginResponse {
  token: string;
  staff: {
    id: number;
    email: string;
    name: string;
  };
}
