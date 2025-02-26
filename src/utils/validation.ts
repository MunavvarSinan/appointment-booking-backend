import { generateTimeSlots } from './time-slots';

export interface AppointmentData {
    name: string;
    phoneNumber: string;
    date: string;
    timeSlot: string;
}

export function validateAppointmentData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required fields
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.phoneNumber || typeof data.phoneNumber !== 'string' || data.phoneNumber.trim() === '') {
        errors.push('Phone number is required');
    } else if (!/^\+?[0-9]{10,15}$/.test(data.phoneNumber.replace(/[\s-]/g, ''))) {
        errors.push('Invalid phone number format');
    }

    if (!data.date || typeof data.date !== 'string') {
        errors.push('Date is required');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
        errors.push('Invalid date format. Use YYYY-MM-DD');
    } else {
        const appointmentDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (appointmentDate < today) {
            errors.push('Cannot book appointments in the past');
        }
    }

    if (!data.timeSlot || typeof data.timeSlot !== 'string') {
        errors.push('Time slot is required');
    } else if (!/^\d{2}:\d{2}$/.test(data.timeSlot)) {
        errors.push('Invalid time slot format. Use HH:MM');
    } else {
        const validSlots = generateTimeSlots();
        if (!validSlots.includes(data.timeSlot)) {
            errors.push('Invalid time slot');
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}