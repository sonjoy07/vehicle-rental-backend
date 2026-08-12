import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { VehicleService } from '../services/VehicleService';
import { env } from '../config/env';
import {
  CreateVehicleDto,
  PaginatedResult,
  UpdateVehicleDto,
  Vehicle,
  VehicleListQuery,
} from '../types/vehicle.types';
import { MessageResponse, Params } from '../types/common.types';

const vehicleService = new VehicleService();

export const listVehicles = asyncHandler(
  async (
    req: Request<Params, PaginatedResult<Vehicle>, any, VehicleListQuery>,
    res: Response<PaginatedResult<Vehicle>>,
    next: NextFunction,
  ) => {
    try {
      const { page, limit, category, search } = req.query;
      const result = await vehicleService.list({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        category,
        search,
      });
      // console.log('result',result)
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

export const getVehicle = asyncHandler(
  async (req: Request<Params, Vehicle>, res: Response<Vehicle>) => {
    const vehicle = await vehicleService.getbyId(Number(req.params.id));
    res.status(200).json(vehicle);
  },
);

export const createVehicle = asyncHandler(
  async (req: Request<Params, Vehicle, CreateVehicleDto>, res: Response<Vehicle>) => {
    const photoPath = req.file ? `${env.uploadPath}/${req.file.filename}` : undefined;
    const vehicle = await vehicleService.create(req.body, photoPath);
    res.status(201).json(vehicle);
  },
);
export const updateVehicle = asyncHandler(
  async (req: Request<Params, Vehicle, UpdateVehicleDto>, res: Response<Vehicle>) => {
    const photoPath = req.file ? `${env.uploadPath}/${req.file.filename}` : undefined;
    const vehicle = await vehicleService.update(Number(req.params.id), req.body, photoPath);

    res.status(200).json(vehicle);
  },
);
export const deleteVehicle = asyncHandler(
  async (req: Request<Params, MessageResponse>, res: Response<MessageResponse>) => {
    await vehicleService.remove(Number(req.params.id));
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  },
);
