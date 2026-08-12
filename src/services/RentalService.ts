import { RentalDAO } from '../daos/RentalDAO';
import {
  Rental,
  RentalFilters,
  CreateRentalDto,
  UpdateRentalDto,
  PaginatedResult,
} from '../types/rental.types';
import { AppError } from '../utils/AppError';
import { VehicleDAO } from '../daos/VehicleDAO';
import db from '../config/db';

export class RentalService {
  private rentalDAO = new RentalDAO();
  private vehicleDAO = new VehicleDAO();

  async list(filters: RentalFilters): Promise<PaginatedResult<Rental>> {
    const { data, total } = await this.rentalDAO.getAllActiveRental(filters);
    // console.log('data', data, total)
    return {
      data,
      total,
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  }
  async getbyId(id: number): Promise<Rental> {
    const rental = await this.rentalDAO.getDataById(id);
    if (!rental) throw new AppError('Rental not found', 404);
    return rental;
  }

  async create(payload: CreateRentalDto): Promise<Rental> {
    return db.transaction(async (trx) => {
      const vechicle = await this.vehicleDAO.getActiveVehicleById(payload.vehicle_id);
      if (!vechicle) throw new AppError('Vehicle not found', 404);
      const clash = await this.rentalDAO.findOverLapping(
        payload.vehicle_id,
        payload.start_date,
        payload.end_date,
        undefined,
        trx,
      );

      if (clash) throw new AppError('Vehicle is already booked for these days', 409);

      const days = this.calculateDays(payload.start_date, payload.end_date);
      const total_amount = days * Number(vechicle.daily_rate);

      return this.rentalDAO.create({
        ...payload,
        total_amount,
        status: 'booked',
      });
    });
  }
  async update(id: number, payload: UpdateRentalDto): Promise<Rental> {
    return db.transaction(async (trx) => {
      const existing = await this.rentalDAO.getDataById(id);
      if (!existing) throw new AppError('rental not found', 404);

      const startDate = payload.start_date || existing.start_date;
      const endDate = payload.end_date || existing.end_date;
      const dateChanged = Boolean(payload.start_date || payload.end_date);
      const updateData: Partial<Rental> = { ...payload };
      if (dateChanged) {
        const clash = await this.rentalDAO.findOverLapping(
          existing.vehicle_id,
          startDate,
          endDate,
          id,
          trx,
        );
        if (clash) throw new AppError('Vehicle is already booked for these days', 409);
        const vehicle = await this.vehicleDAO.getDataById(existing.vehicle_id);
        if (vehicle) {
          const days = this.calculateDays(startDate, endDate);
          updateData.total_amount = days * Number(vehicle.daily_rate);
        }
      }

      const updated = await this.rentalDAO.update(id, updateData);
      if (!updated) throw new AppError('Update failed', 500);

      return updated;
    });
  }

  async remove(id: number): Promise<void> {
    const existing = await this.rentalDAO.getDataById(id);
    if (!existing) throw new AppError('rental not found', 404);
    await this.rentalDAO.delete(id);
  }

  private calculateDays(start_date: string, end_date: string): number {
    const startD = new Date(start_date);
    const endD = new Date(end_date);
    const diffMs = endD.getTime() - startD.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
  }
}
