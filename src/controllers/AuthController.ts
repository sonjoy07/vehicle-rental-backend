import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthService } from '../services/AuthService';
import { LoginResponse } from '../types/auth.types';

const authService = new AuthService();

export const login = asyncHandler(
  async (req: Request, res: Response<LoginResponse>, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      // console.log('result',result)
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);
