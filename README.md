# Vehicle Rental Management Backend

A REST API I built for a vehicle rental company — staff can log in, manage the fleet, and record customer rentals. Made sure a vehicle can't get double-booked for overlapping dates, and added a monthly report to see rental activity per vehicle.

Built this as part of a backend assignment. Stack: Node.js, TypeScript, Express, Knex, PostgreSQL.

## Stack

- Node.js + TypeScript (OOP-ish structure — services/DAOs, not everything dumped in route handlers)
- Express
- Knex (query builder) + PostgreSQL
- JWT for auth
- Joi for validation
- Multer for vehicle photo uploads
- bcrypt for password hashing

## Project structure
src/
config/ - db, env, multer setup
daos/ - raw db queries, no business logic here
services/ - business logic (overlap check, report calc, etc)
controllers/ - request/response handling
routes/ - route definitions
middlewares/ - auth, validation, error handling
validators/ - joi schemas
types/ - typescript interfaces
utils/ - helper functions
migrations/ - db schema
seeds/ - demo data

## Setup

You'll need Node.js (18+) and PostgreSQL running locally.

1. Clone the repo and install dependencies

```bash
git clone https://github.com/sonjoy07/vehicle-rental-backend.git
cd vehicle-rental-backend
npm install
```

2. Copy the env file and fill in your own values

```bash
cp .env.example .env
```

Update `.env` with your postgres credentials (see below for what each var means).

3. Create the database (if it doesn't already exist)

```bash
createdb vehicle_rental
```

or just create it manually via psql / pgAdmin, whatever you're comfortable with.

4. Run migrations

```bash
npm run migrate
```

5. Seed some demo data (staff account + vehicles + rentals)

```bash
npm run seed
```

This gives you a login you can actually test with — see below.

6. Start the dev server

```bash
npm run dev
```

Server runs on `http://localhost:4000` by default (or whatever `PORT` you set in `.env`).

## Environment variables

Check `.env.example` for the full list, but the important ones:

| Variable | What it's for |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | your postgres connection |
| `JWT_SECRET` | secret used to sign tokens — change this, don't leave the default |
| `UPLOAD_PATH` | where vehicle photos get saved (`uploads/vehicles` by default) |
| `PORT` | what port the server runs on |

## Demo login

After seeding, you can log in with:

email: admin@rental.com
password: password123

Hit `POST /auth/login` with that and you'll get a JWT — every other route (`/vehicles`, `/rentals`, `/reports`) needs this token in the `Authorization: Bearer <token>` header.

## API overview

### Auth
- `POST /auth/login` — get a JWT

### Vehicles (all protected)
- `GET /vehicles` — list, supports `?page=&limit=&category=&search=`
- `GET /vehicles/:id`
- `POST /vehicles` — multipart form-data, photo goes in a field called `photo`
- `PUT /vehicles/:id` — same, can replace photo
- `DELETE /vehicles/:id` — soft delete, doesn't actually remove the row

### Rentals (all protected)
- `GET /rentals` — filter by `?vehicle_id=&status=&from=&to=`
- `GET /rentals/:id`
- `POST /rentals` — books a vehicle, returns 409 if dates overlap an existing active rental for that vehicle
- `PUT /rentals/:id` — changing dates re-runs the overlap check
- `DELETE /rentals/:id`

### Reports (protected)
- `GET /reports/rentals?month=YYYY-MM&vehicle_id=` — per-vehicle bookings/days/revenue for that month, plus the top-earning vehicle. Only counts the days that actually fall in the requested month (so a rental spanning two months gets split correctly across both reports).

## A few implementation notes

**Overlap check** — happens in the service layer, not the DB (no exclusion constraint on the table, on purpose per the assignment). Two rentals conflict if `existing.start <= new.end AND existing.end >= new.start`, and only `booked`/`ongoing` rentals count as active. The check + insert both run inside a transaction with a row lock (`FOR UPDATE`) so two requests booking the same vehicle at the same time can't both slip through.

**Report query** — uses `LEAST`/`GREATEST` in raw SQL to clip each rental's date range to the requested month before counting days and revenue. Example: a rental running July 29–Aug 3, when you ask for the August report, only the Aug 1–3 portion (3 days) gets counted, not the whole 6-day rental.

**total_amount** — always calculated server-side (daily_rate × days), never trusted from the client. Same start/end date = 1 day.

## Running lint/format

```bash
npm run lint
npm run format
```

## Known limitations / things I'd do differently with more time

- No refresh token, JWT just expires and you log in again
- File cleanup on vehicle photo replace is best-effort (doesn't block the request if deletion fails)
- No automated test suite yet — tested everything manually via Postman while building

---

Built by Sonjoy Biswas