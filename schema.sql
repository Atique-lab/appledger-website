-- AppLedger Neon Postgres Database Schema

-- Pre-booking Early Access Submissions
CREATE TABLE IF NOT EXISTS prebookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    org_type VARCHAR(255) NOT NULL,
    employee_count VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    ip_address VARCHAR(45) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact Support Form Submissions
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
