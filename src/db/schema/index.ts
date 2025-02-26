import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const appointments = sqliteTable('appointments', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    phoneNumber: text('phone_number').notNull(),
    date: text('date').notNull(), // Format: YYYY-MM-DD
    timeSlot: text('time_slot').notNull(), // Format: HH:MM
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;