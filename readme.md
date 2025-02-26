# Appointment Booking API

This is an Express-based appointment booking API that allows users to fetch available time slots and create new appointments.

## Features

- Fetch available time slots for a given date
- Book an appointment
- Prevent double booking for the same time slot

## Technologies Used

- **Express.js** - Backend framework
- **Drizzle ORM** - Database interaction
- **PostgreSQL** - Database
- **TypeScript** - Type safety

## Installation

### Prerequisites

- Node.js (>= 16)
- PostgreSQL database

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/MunavvarSinan/appointment-booking-backend
   cd appointment-booking-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```env
   DATABASE_URL=file:./local.db
   ```
4. Run database migrations (if needed):
   ```sh
   npm run migrate
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Get Available Slots

**GET** `/api/v1/appointments/slots?date=YYYY-MM-DD`

#### Request Parameters:

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| date      | string | Date in `YYYY-MM-DD` format |

#### Response Example:

```json
{
  "date": "2025-02-26",
  "slots": ["10:00 AM", "11:00 AM", "1:00 PM"]
}
```

### Create an Appointment

**POST** `/api/v1/appointments`

#### Request Body:

```json
{
  "name": "John Doe",
  "phoneNumber": "+911234567890",
  "date": "2025-02-26",
  "timeSlot": "10:00 AM"
}
```

#### Response Example:

```json
{
  "id": 1,
  "name": "John Doe",
  "phoneNumber": "+911234567890",
  "date": "2025-02-26",
  "timeSlot": "10:00 AM"
}
```

## Error Handling

| Error Message             | Status Code | Description                              |
| ------------------------- | ----------- | ---------------------------------------- |
| `Invalid date format`     | 400         | The date must be in `YYYY-MM-DD` format. |
| `Missing required fields` | 400         | All fields are required.                 |
| `Invalid time slot`       | 400         | The selected time slot is not available. |
| `Slot already booked`     | 400         | The time slot is already booked.         |

## License

This project is licensed under the MIT License.
