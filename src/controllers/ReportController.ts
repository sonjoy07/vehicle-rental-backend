import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ReportService } from '../services/ReportService';
import { AppError } from '../utils/AppError';

const reportService = new ReportService();

export const getRentalReport = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { month, vehicle_id } = req.query;
    if (!month || typeof month !== 'string') {
      throw new AppError('month query params is required(format: YYYY-MM)', 400);
    }

    const result = await reportService.getMonthlyReport(
      month,
      vehicle_id ? Number(vehicle_id) : undefined,
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: `Invalid data ${err}` });
  }
});
