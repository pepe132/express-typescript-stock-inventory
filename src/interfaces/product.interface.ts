export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  cost: number;
  sku: string;
  category_id: number;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  cost: number;
  sku: string;
  category_id: number;
  company_id: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  cost?: number;
  sku?: string;
  category_id?: number;
}

export interface ProductFilterDTO {
  category_id?: number;
  name?: string;
  sku?: string;
}
