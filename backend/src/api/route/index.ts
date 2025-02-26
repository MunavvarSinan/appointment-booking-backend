import { Router } from 'express';
import { AppoinmentController } from '../controller';
const router = Router();

const { getAvailableSlots, createAppointment } = new AppoinmentController();

// GET /api/appointments/available-slots?date=YYYY-MM-DD
router.get('/slots', getAvailableSlots);

// POST /api/appointments
router.post('/', createAppointment);


export function registerRoutes(app: Router): void {
    app.use('/api/v1/appointments', router);
}
