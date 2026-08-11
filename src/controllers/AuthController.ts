import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthService } from "../services/AuthService";

const authService = new AuthService()

export const login = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body)
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ error: 'Invalid credintials' })
    }
})