import { Router } from "express";
import authRoutes from './auth.routes'
import vehicleRoutes from './vehicle.routes'
import rentalRoutes from './rental.routes'

const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/vehicles', vehicleRoutes)
routes.use('/rentals', rentalRoutes)
export default routes;