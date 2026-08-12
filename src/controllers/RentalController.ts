import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RentalService } from '../services/RentalService';
import {
  CreateRentalDto,
  PaginatedResult,
  Rental,
  RentalListQuery,
  UpdateRentalDto,
} from '../types/rental.types';
import { MessageResponse, Params } from '../types/common.types';

const rentalService = new RentalService();

export const listRentals = asyncHandler(
  async (
    req: Request<Params, PaginatedResult<Rental>, any, RentalListQuery>,
    res: Response<PaginatedResult<Rental>>,
    next: NextFunction,
  ) => {
    try {
      const { page, limit, vehicle_id, status, from, to } = req.query;
      const result = await rentalService.list({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        vehicle_id: vehicle_id ? Number(vehicle_id) : undefined,
        status,
        from,
        to,
      });
      // console.log('result',result)
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

export const getRental = asyncHandler(
  async (req: Request<Params, Rental>, res: Response<Rental>) => {
    const rental = await rentalService.getbyId(Number(req.params.id));
    res.status(200).json(rental);
  },
);

export const createRental = asyncHandler(
  async (req: Request<Params, Rental, CreateRentalDto>, res: Response<Rental>) => {
    const rental = await rentalService.create(req.body);
    res.status(201).json(rental);
  },
);
export const updateRental = asyncHandler(
  async (req: Request<Params, Rental, UpdateRentalDto>, res: Response<Rental>) => {
    const rental = await rentalService.update(Number(req.params.id), req.body);

    res.status(200).json(rental);
  },
);
export const deleteRental = asyncHandler(
  async (req: Request<Params, MessageResponse>, res: Response<MessageResponse>) => {
    await rentalService.remove(Number(req.params.id));
    res.status(200).json({ message: 'Rental deleted successfully' });
  },
);
