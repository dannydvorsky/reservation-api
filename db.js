const Database = require('better-sqlite3');

const db = new Database('./database.db');

db.exec(`

-- Table for storing reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,                        -- Auto-incrementing unique ID
    merchant_name TEXT NOT NULL,                                  -- Merchant / company name (required)
    place_name TEXT NOT NULL,                                     -- Place / branch name (required)
    table_number INTEGER NOT NULL,                                -- Table number (required)
    people_count INTEGER NOT NULL CHECK (people_count > 0),       -- Number of guests must be > 0
    note TEXT,                                                    -- Optional note or special request
    date_time TEXT NOT NULL,                                      -- Reservation datetime in ISO 8601 format (required)
    customer_name TEXT NOT NULL,                                  -- Customer’s name (required)
    customer_phone TEXT NOT NULL,                                 -- Customer’s phone (required)
    customer_email TEXT NOT NULL,                                 -- Customer’s email (required)
    created_at TEXT NOT NULL,                                     -- Timestamp of when reservation was created
    status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'canceled', 'completed')) -- Only allowed statuses
);

-- Table for storing admin users (for JWT login)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,                         -- Unique ID for each user
    username TEXT NOT NULL UNIQUE,                                 -- Unique username (required)
    password TEXT NOT NULL                                         -- Hashed password (required)
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date_time);
CREATE INDEX IF NOT EXISTS idx_reservations_place ON reservations(place_name);

`);

module.exports = db;