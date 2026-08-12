import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { RentalService } from "../services/RentalService";
import { env } from "../config/env";

const rentalService = new RentalService()

export const listRentals = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { page, limit, vehicle_id, status,from,to } = req.query;
        const result = await rentalService.list({
            page: page ? Number(page) : undefined,
            limit: page ? Number(limit) : undefined,
            vehicle_id: vehicle_id?Number(vehicle_id):undefined,
            status: status as any,
            from: from as string,
            to: to as string
        })
        // console.log('result',result)
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ error: 'Invalid data' })
    }
});

export const getRental = asyncHandler(async (req: Request, res: Response) => {
    const rental = await rentalService.getbyId(Number(req.params.id));
    res.status(200).json(rental)
})

export const createRental = asyncHandler(async (req: Request, res: Response) => {
    const rental = await rentalService.create(req.body);
    res.status(201).json(rental);
})
export const updateRental = asyncHandler(async (req: Request, res: Response) => {
    const rental = await rentalService.update(Number(req.params.id), req.body);

    res.status(200).json(rental);
})
export const deleteRental = asyncHandler(async (req: Request, res: Response) => {
    await rentalService.remove(Number(req.params.id))
    res.status(200).json({ message: 'Rental deleted successfully' });
})