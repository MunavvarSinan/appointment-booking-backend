export const isValidTimeSlot = (time: string): boolean => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes < 600 || totalMinutes > 1020) return false;

    if (totalMinutes >= 780 && totalMinutes < 840) return false;

    return minutes % 30 === 0;
};