import { RentalDAO } from '../daos/RentalDAO';
import { MonthlyReportResponse, VehicleReportRow } from '../types/report.types';
import { getMonthRange } from '../utils/dateUtils';

export class ReportService {
  private rentalDAO = new RentalDAO();

  async getMonthlyReport(month: string, vehicleId?: number): Promise<MonthlyReportResponse> {
    const { start, end } = getMonthRange(month);
    const rows: VehicleReportRow[] = await this.rentalDAO.getMonthlyReport(start, end, vehicleId);

    const topVehicle = rows.reduce<VehicleReportRow | null>((top, current) => {
      if (!top || Number(current.revenue) > Number(top.revenue)) return current;
      return top;
    }, null);

    return {
      month,
      vehicle: rows,
      top_vehicle: topVehicle,
    };
  }
}
