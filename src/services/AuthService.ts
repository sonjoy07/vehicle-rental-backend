import jwt from 'jsonwebtoken';
import { StaffDAO } from '../daos/StaffDAO';
import { comparePassword } from '../utils/password';
import { env } from '../config/env'
import { LoginDto, LoginResponse } from '../types/auth.types';
import { AppError } from '../utils/AppError';

export class AuthService {
    private staffDAO = new StaffDAO();

    async login(payload: LoginDto): Promise<LoginResponse> {
        const staff = await this.staffDAO.getDataByEmail(payload.email);
        if (!staff) throw new AppError('Invalid Email or password', 401)

        const isMatch = await comparePassword(payload.password, staff.password_hash);
        if ((!isMatch)) throw new AppError('Invalid Email or password', 401)
        
        const token= jwt.sign({id: staff.id,email: staff.email},env.jwt.secret,{
            expiresIn: env.jwt.expiresIn as any
        });

        return {
            token,
            staff:{
                id: staff.id, 
                email: staff.email,
                name: staff.name
            }
        }
    }
}