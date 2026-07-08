export interface Category {
  category_id: number;
  category_name: string;
  status_category: boolean;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateCategoryDTO {
  category_name: string;
  company_id: number;
}

export interface UpdateCategoryDTO {
  category_name?: string;
  status_category?: boolean;
}
