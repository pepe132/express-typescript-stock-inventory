export interface User {
  user_id: number;
  user_name: string;
  user_password: string;
  email: string;
  role_id: number;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateUserDTO {
  user_name: string;
  email: string;
  user_password: string;
  role_id: number;
  company_id: number;
}

export interface UpdateUserDTO {
  user_name?: string;
  email?: string;
  user_password?: string;
  role_id?: number;
}

export interface UserResponseDTO {
  user_id: number;
  user_name: string;
  email: string;
  role_id: number;
  company_id: number;
}
