import { Router } from "express";
import { createRentalSchema, updateRentalSchema, } from "../validators/rental.validator";
import { validate } from "../middlewares/validate";
import { getRental, listRentals, createRental, updateRental, deleteRental } from "../controllers/RentalController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";

const router = Router();
router.use(authMiddleware)

router.get('/', listRentals)
router.get('/:id', getRental)
router.post('/',validate(createRentalSchema), createRental)
router.put('/:id', validate(updateRentalSchema), updateRental)
router.delete('/:id', deleteRental);
export default router