export interface Company {
  company_id: number;
  company_name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateCompanyDTO {
  company_name: string;
}

export interface UpdateCompanyDTO {
  company_name: string;
}
