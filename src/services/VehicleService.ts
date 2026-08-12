import { VehicleDAO } from '../daos/VehicleDAO';
import {
  Vehicle,
  VehicleFilters,
  CreateVehicleDto,
  UpdateVehicleDto,
  PaginatedResult,
} from '../types/vehicle.types';
import { AppError } from '../utils/AppError';
import path from 'path';
import fs from 'fs';

export class VehicleService {
  private vehicleDAO = new VehicleDAO();

  async list(filters: VehicleFilters): Promise<PaginatedResult<Vehicle>> {
    const { data, total } = await this.vehicleDAO.getAllActiveVehicle(filters);
    console.log('data', data, total);
    return {
      data,
      total,
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  }
  async getbyId(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleDAO.getDataById(id);
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    return vehicle;
  }

  async create(payload: CreateVehicleDto, photoPath?: string): Promise<Vehicle> {
    const existing = await this.vehicleDAO.getActiveVehicleByPlateNumber(payload.plate_number);
    if (existing) throw new AppError('plate number already exists', 409);
    return this.vehicleDAO.create({
      ...payload,
      photo_path: photoPath || null,
    });
  }
  async update(id: number, payload: UpdateVehicleDto, photoPath?: string): Promise<Vehicle> {
    const existing = await this.vehicleDAO.getActiveVehicleById(id);
    if (!existing) throw new AppError('vehicle not found', 404);

    if (payload.plate_number && payload.plate_number !== existing.plate_number) {
      const clash = await this.vehicleDAO.getActiveVehicleByPlateNumber(payload.plate_number);
      if (clash) throw new AppError('Plate number already exists', 409);
    }
    const updateData: Partial<Vehicle> = { ...payload };
    if (photoPath) {
      updateData.photo_path = photoPath;
      if (existing.photo_path) {
        this.deleteFileIfExists(existing.photo_path);
      }
    }

    const updated = await this.vehicleDAO.update(id, updateData);
    if (!updated) throw new AppError('Update failed', 500);

    return updated;
  }

  async remove(id: number): Promise<void> {
    const existing = await this.vehicleDAO.getActiveVehicleById(id);
    if (!existing) throw new AppError('vehicle not found', 404);
    await this.vehicleDAO.softDelete(id);
    return;
  }

  private deleteFileIfExists(relativePath: string): void {
    const fullPath = path.join(process.cwd(), relativePath);
    fs.unlink(fullPath, (err) => {
      if (err) console.error('Failed to delete old photo:', err.message);
    });
  }
}
