export interface Warehouse {
  id: number;
  name: string;
  location?: string;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateWarehouseDTO {
  name: string;
  location?: string;
  company_id: number;
}

export interface UpdateWarehouseDTO {
  name?: string;
  location?: string;
}
