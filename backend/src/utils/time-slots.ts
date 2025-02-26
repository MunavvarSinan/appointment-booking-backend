// src/utils/timeSlots.ts
export type TimeSlot = {
    time: string;
    available: boolean;
};

// Generate all possible 30-minute slots between 10:00 AM and 5:00 PM
export const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const startHour = 10;
    const endHour = 17; // 5:00 PM

    for (let hour = startHour; hour < endHour; hour++) {
        // Skip lunch break (1:00 PM - 2:00 PM)
        if (hour === 13) continue;

        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    return slots;
};

// Get available slots for a specific date
export const getAvailableSlots = async (
    date: string,
    bookedSlots: string[]
): Promise<TimeSlot[]> => {
    const allSlots = generateTimeSlots();

    return allSlots.map(time => ({
        time,
        available: !bookedSlots.includes(time)
    }));
};