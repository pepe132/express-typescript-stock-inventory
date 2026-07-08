export interface RegisterUserDTO {
  user_name: string;
  email: string;
  user_password: string;
  company_id: number;
  role_id: number;
}

export interface LoginDTO {
  email: string;
  user_password: string;
}

export interface AuthResponseDTO {
  user: {
    user_id: number;
    user_name: string;
    email: string;
    role_id: number;
    company_id: number;
  };
  token: string;
}
