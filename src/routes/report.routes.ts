import { Router } from 'express';
import { getRentalReport } from '../controllers/ReportController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.get('/rentals', getRentalReport);
export default router;
