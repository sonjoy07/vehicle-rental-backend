import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ReportService } from '../services/ReportService';
import { AppError } from '../utils/AppError';
import { MonthlyReportResponse } from '../types/report.types';
import { Params } from '../types/common.types';

const reportService = new ReportService();

interface ReportQuery {
  month?: string;
  vehicle_id?: string;
}

export const getRentalReport = asyncHandler(
  async (
    req: Request<Params, MonthlyReportResponse, any, ReportQuery>,
    res: Response<MonthlyReportResponse>,
    next: NextFunction,
  ) => {
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
      next(err);
    }
  },
);
