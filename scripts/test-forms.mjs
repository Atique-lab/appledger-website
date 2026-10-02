import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

const connectionString = process.env.DATABASE_URL;
const resendApiKey = process.env.RESEND_API_KEY;

async function testForms() {
  console.log('Testing End-to-End Form Processing against Neon & Resend...');
  const sql = neon(connectionString);
  const resend = new Resend(resendApiKey);

  // 1. Insert Test Prebooking
  console.log('\n1. Testing Pre-booking Submission...');
  const testPrebook = {
    name: 'Verification Bot',
    email: 'support@appledger.in',
    role: 'CEO / Managing Director',
    org_name: 'AppLedger Migration Suite',
    org_type: 'Software & Digital Agency',
    employee_count: '11 - 50 employees',
    reason: 'End-to-End Verification Test for Next.js Migration',
    ip: '127.0.0.1'
  };

  await sql`
    INSERT INTO prebookings (full_name, email, role, org_name, org_type, employee_count, reason, ip_address)
    VALUES (${testPrebook.name}, ${testPrebook.email}, ${testPrebook.role}, ${testPrebook.org_name}, ${testPrebook.org_type}, ${testPrebook.employee_count}, ${testPrebook.reason}, ${testPrebook.ip})
  `;
  console.log('✅ Inserted test row into Neon prebookings table.');

  // 2. Insert Test Contact Message
  console.log('\n2. Testing Contact Message Submission...');
  const testContact = {
    name: 'Verification Bot',
    email: 'support@appledger.in',
    subject: 'System Migration Verification',
    message: 'Testing contact message row insertion into Neon Postgres and Resend email delivery.',
    ip: '127.0.0.1'
  };

  await sql`
    INSERT INTO contact_messages (full_name, email, subject, message, ip_address)
    VALUES (${testContact.name}, ${testContact.email}, ${testContact.subject}, ${testContact.message}, ${testContact.ip})
  `;
  console.log('✅ Inserted test row into Neon contact_messages table.');

  // 3. Verify Row Counts
  const pbCount = await sql`SELECT COUNT(*)::int as count FROM prebookings`;
  const cmCount = await sql`SELECT COUNT(*)::int as count FROM contact_messages`;

  console.log(`\nVerified Row Counts in Neon Postgres:`);
  console.log(`- Prebookings count: ${pbCount[0].count}`);
  console.log(`- Contact messages count: ${cmCount[0].count}`);

  // 4. Test Resend Transactional Email Delivery
  console.log('\n3. Testing Resend Email API Delivery...');
  const emailRes = await resend.emails.send({
    from: 'AppLedger Support <support@appledger.in>',
    to: ['support@appledger.in'],
    subject: 'Verification Test: AppLedger Next.js Migration Complete',
    html: '<p>This is an automated verification email confirming that Resend API delivery is active and working for appledger.in.</p>'
  });

  if (emailRes.data && emailRes.data.id) {
    console.log(`✅ Resend Email Delivered Successfully! Email ID: ${emailRes.data.id}`);
  } else {
    console.log('Resend Delivery Response:', emailRes);
  }
}

testForms();
