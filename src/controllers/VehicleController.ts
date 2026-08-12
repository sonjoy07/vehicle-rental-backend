import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { VehicleService } from "../services/VehicleService";
import { env } from "../config/env";

const vehicleService = new VehicleService()

export const listVehicles = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { page, limit, category, search } = req.query;
        const result = await vehicleService.list({
            page: page ? Number(page) : undefined,
            limit: page ? Number(limit) : undefined,
            category: category as string,
            search: search as string
        })
        // console.log('result',result)
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ error: 'Invalid data' })
    }
});

export const getVehicle = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.getbyId(Number(req.params.id));
    res.status(200).json(vehicle)
})

export const createVehicle = asyncHandler(async (req: Request, res: Response) => {
    const photoPath = req.file ? `${env.uploadPath}/${req.file.filename}` : undefined;
    const { name, plate_number, category, daily_rate } = req.body
    const vehicle = await vehicleService.create({
        name, plate_number, category, daily_rate
    }, photoPath);
    res.status(201).json(vehicle);
})
export const updateVehicle = asyncHandler(async (req: Request, res: Response) => {
    const photoPath = req.file ? `${env.uploadPath}/${req.file.filename}` : undefined;
    const vehicle = await vehicleService.update(Number(req.params.id), req.body, photoPath);

    res.status(200).json(vehicle);
})
export const deleteVehicle = asyncHandler(async (req: Request, res: Response) => {
    await vehicleService.remove(Number(req.params.id))
    res.status(200).json({ message: 'Vehicle deleted successfully' });
})