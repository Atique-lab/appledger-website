import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AppLedger Support <support@appledger.in>';
const SUPPORT_EMAIL = process.env.SITE_SUPPORT_EMAIL || 'support@appledger.in';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name = '',
      email = '',
      role = '',
      other_role = '',
      org_name = '',
      org_type = '',
      employee_count = '',
      reason = '',
      security_hp_blank = '',
    } = body;

    // 1. Honeypot Anti-Spam Check
    if (security_hp_blank && security_hp_blank.trim() !== '') {
      console.log('Honeypot Bot Triggered');
      return NextResponse.json({
        success: true,
        message: `Thank you! Your early access reservation for AppLedger has been received.`,
        data: { name, org_name },
      });
    }

    // 2. Server-side Validation
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanRole = role === 'Other' && other_role ? `Other (${other_role.trim()})` : role.trim();
    const cleanOrgName = org_name.trim();
    const cleanOrgType = org_type.trim();
    const cleanEmpCount = employee_count.trim();
    const cleanReason = reason.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanRole ||
      !cleanOrgName ||
      !cleanOrgType ||
      !cleanEmpCount ||
      !cleanReason
    ) {
      return NextResponse.json(
        { success: false, message: 'All fields are required. Please check your inputs.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    // 3. Save to Neon Postgres
    try {
      await sql`
        INSERT INTO prebookings (full_name, email, role, org_name, org_type, employee_count, reason, ip_address)
        VALUES (${cleanName}, ${cleanEmail}, ${cleanRole}, ${cleanOrgName}, ${cleanOrgType}, ${cleanEmpCount}, ${cleanReason}, ${ip})
      `;
    } catch (dbErr) {
      console.error('Database Insert Error (prebookings):', dbErr);
    }

    // 4. Send Emails via Resend
    try {
      const adminSubject = `New Pre-Booking Early Access Reservation: ${cleanOrgName}`;
      const adminBody = `
        <h3>New Pre-Booking Reservation Received</h3>
        <p><strong>1. Full Name:</strong> ${cleanName}</p>
        <p><strong>2. Email:</strong> ${cleanEmail}</p>
        <p><strong>3. Role:</strong> ${cleanRole}</p>
        <p><strong>4. Organization Name:</strong> ${cleanOrgName}</p>
        <p><strong>5. Organization Type:</strong> ${cleanOrgType}</p>
        <p><strong>6. Employee Count:</strong> ${cleanEmpCount}</p>
        <p><strong>7. Operational Reason:</strong><br>${cleanReason.replace(/\n/g, '<br>')}</p>
        <hr><p><small>IP Address: ${ip} | Timestamp: ${new Date().toISOString()}</small></p>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [SUPPORT_EMAIL],
        replyTo: cleanEmail,
        subject: adminSubject,
        html: adminBody,
      });

      const userSubject = 'Early Access Reservation Confirmed - AppLedger';
      const userBody = `
        <p>Thanks, <strong>${cleanName}</strong> — we've got <strong>${cleanOrgName}</strong> on the early access list.</p>
        <p>We received your reservation request for AppLedger. Our deployment team will reach out as your organization's batch opens.</p>
        <br><p>Best regards,<br><strong>The AppLedger Team</strong><br><a href="https://appledger.in">https://appledger.in</a></p>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [cleanEmail],
        replyTo: SUPPORT_EMAIL,
        subject: userSubject,
        html: userBody,
      });
    } catch (mailErr) {
      console.error('Resend Email Delivery Error:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: `Thanks, ${cleanName} — we've got ${cleanOrgName} on the early access list.`,
      data: { name: cleanName, org_name: cleanOrgName },
    });
  } catch (error) {
    console.error('API Error (/api/prebooking):', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
