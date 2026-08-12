export type RentalStatus = 'booked' | 'ongoing' | 'completed' | 'cancelled';
export interface Rental {
  id: number;
  vehicle_id: number;
  customer_name: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: RentalStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateRentalDto {
  vehicle_id: number;
  customer_name: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
}

export interface UpdateRentalDto {
  vehicle_id?: number;
  customer_name?: string;
  customer_phone?: string;
  start_date?: string;
  end_date?: string;
  status?: RentalStatus;
}
export interface RentalFilters {
  page?: number;
  limit?: number;
  vehicle_id?: number;
  status?: RentalStatus;
  from?: string;
  to?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface RentalListQuery {
  page?: string;
  limit?: string;
  vehicle_id?: string;
  status?: RentalStatus;
  from?: string;
  to?: string;
}
