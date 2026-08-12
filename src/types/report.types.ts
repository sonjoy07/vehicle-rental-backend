export interface VehicleReportRow {
  id: number;
  name: string;
  total_booking: number;
  days_rented: number;
  revenue: number;
}

export interface MonthlyReportResponse {
  month: string;
  vehicle: VehicleReportRow[];
  top_vehicle: VehicleReportRow | null;
}
