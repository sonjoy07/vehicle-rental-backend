import { Router } from 'express';
import authRoutes from './auth.routes';
import vehicleRoutes from './vehicle.routes';
import rentalRoutes from './rental.routes';
import reportRoutes from './report.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/vehicles', vehicleRoutes);
routes.use('/rentals', rentalRoutes);
routes.use('/reports', reportRoutes);
export default routes;
