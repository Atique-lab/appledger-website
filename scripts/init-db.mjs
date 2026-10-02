import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const connectionString = 'postgresql://neondb_owner:npg_dVti46BAezWp@ep-wild-haze-ax4slyp4-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function initDB() {
    console.log('Connecting to Neon Postgres database...');
    const sql = neon(connectionString);
    
    try {
        const testRes = await sql`SELECT NOW() as current_time, VERSION() as version`;
        console.log('✅ Connection Successful!');
        console.log('Database time:', testRes[0].current_time);
        console.log('Postgres version:', testRes[0].version);

        console.log('\nInitializing database tables...');
        await sql`
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
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                ip_address VARCHAR(45) DEFAULT '127.0.0.1',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const prebookingsCount = await sql`SELECT COUNT(*)::int as count FROM prebookings`;
        const contactCount = await sql`SELECT COUNT(*)::int as count FROM contact_messages`;

        console.log('✅ Tables created/verified!');
        console.log(`Pre-bookings row count: ${prebookingsCount[0].count}`);
        console.log(`Contact messages row count: ${contactCount[0].count}`);

    } catch (err) {
        console.error('❌ Database Initialization Failed:', err);
        process.exit(1);
    }
}

initDB();
