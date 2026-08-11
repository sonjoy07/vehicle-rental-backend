import { Router } from "express";
import { createVehicleSchema, updateVehicleSchema, } from "../validators/vehicle.validator";
import { validate } from "../middlewares/validate";
import { getVehicle, listVehicles, createVehicle, updateVehicle, deleteVehicle } from "../controllers/VehicleController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";

const router = Router();
router.use(authMiddleware)

router.get('/', listVehicles)
router.get('/:id', getVehicle)
router.post('/', upload.single('photo'), validate(createVehicleSchema), createVehicle)
router.put('/:id', upload.single('photo'), validate(updateVehicleSchema), updateVehicle)
router.delete('/:id', deleteVehicle)
export default router