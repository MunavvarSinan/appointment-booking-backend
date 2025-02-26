import { db } from '@/db';
import { appointments } from '@/db/schema';
import { AppError } from '@/utils/errors/app-error';
import { generateTimeSlots, getAvailableSlots } from '@/utils/time-slots';
import { Request, Response, NextFunction } from 'express';
import { and, eq } from 'drizzle-orm';

export class AppoinmentController {
    constructor() { }

    getAvailableSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { date } = req.query;

            // Ensure date is a string
            if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                throw new AppError('Invalid date format', 400, 'BAD_REQUEST');
            }

            // Get booked slots for the given date
            const bookedAppointments = await db
                .select({ timeSlot: appointments.timeSlot })
                .from(appointments)
                .where(eq(appointments.date, date));

            const bookedSlots = bookedAppointments.map(a => a.timeSlot);
            const availableSlots = await getAvailableSlots(date, bookedSlots);

            res.json({ date, slots: availableSlots });
        } catch (error) {
            console.error('Error fetching slots:', error);
            res.status(500).json({ error: 'Failed to fetch available slots' });
        }
    }

    createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, phoneNumber, date, timeSlot } = req.body;

            // Basic validation
            if (!name || !phoneNumber || !date || !timeSlot) {
                throw new AppError('Missing required fields', 400, 'BAD_REQUEST');
            }

            // Validate date format (YYYY-MM-DD)
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                throw new AppError('Invalid date format', 400, 'BAD_REQUEST');
            }

            // Validate time slot
            const validTimeSlots = generateTimeSlots();
            if (!validTimeSlots.includes(timeSlot)) {
                throw new AppError('Invalid time slot',
                    400, 'BAD_REQUEST');
            }

            // Check if the slot is already booked
            const existingAppointment = await db
                .select()
                .from(appointments)
                .where(
                    and(
                        eq(appointments.date, date),
                        eq(appointments.timeSlot, timeSlot)
                    )
                )
                .limit(1);

            if (existingAppointment.length > 0) {
                throw new AppError('Slot already booked', 400, 'BAD_REQUEST');
            }

            // Book the appointment
            const newAppointment = await db.insert(appointments).values({
                name,
                phoneNumber,
                date,
                timeSlot
            }).returning();

            res.status(201).json(newAppointment[0]);
        } catch (error) {
            console.error('Error booking appointment:', error);
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to book appointment' });
            }
        }
    }
}