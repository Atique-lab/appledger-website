import { neon } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_dVti46BAezWp@ep-wild-haze-ax4slyp4-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function cleanup() {
  const sql = neon(connectionString);
  await sql`DELETE FROM prebookings WHERE full_name = 'Verification Bot'`;
  await sql`DELETE FROM contact_messages WHERE full_name = 'Verification Bot'`;
  console.log('✅ Cleaned up verification test rows from database.');
}

cleanup();
