import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthService } from '../services/AuthService';
import { LoginDto, LoginResponse } from '../types/auth.types';
import { Params } from '../types/common.types';

const authService = new AuthService();

export const login = asyncHandler(
  async (
    req: Request<Params, LoginResponse, LoginDto>,
    res: Response<LoginResponse>,
    next: NextFunction,
  ) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);
