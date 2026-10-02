import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AppLedger Support <support@appledger.in>';
const SUPPORT_EMAIL = process.env.SITE_SUPPORT_EMAIL || 'support@appledger.in';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name = '', email = '', subject = '', message = '', security_hp_blank = '' } = body;

    // 1. Honeypot Anti-Spam Check
    if (security_hp_blank && security_hp_blank.trim() !== '') {
      console.log('Honeypot Bot Triggered (Contact)');
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent successfully. We received your message and will reply within 24 hours.',
      });
    }

    // 2. Server-side Input Validation
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { success: false, message: 'All fields marked with an asterisk (*) are required.' },
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
        INSERT INTO contact_messages (full_name, email, subject, message, ip_address)
        VALUES (${cleanName}, ${cleanEmail}, ${cleanSubject}, ${cleanMessage}, ${ip})
      `;
    } catch (dbErr) {
      console.error('Database Insert Error (contact_messages):', dbErr);
    }

    // 4. Send Email Notifications via Resend
    try {
      const adminSubject = `New Contact Inquiry: ${cleanSubject}`;
      const adminBody = `
        <h3>New Website Contact Message</h3>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Subject:</strong> ${cleanSubject}</p>
        <p><strong>Message:</strong><br>${cleanMessage.replace(/\n/g, '<br>')}</p>
        <hr><p><small>IP Address: ${ip} | Timestamp: ${new Date().toISOString()}</small></p>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [SUPPORT_EMAIL],
        replyTo: cleanEmail,
        subject: adminSubject,
        html: adminBody,
      });

      const userSubject = 'We received your message - AppLedger Support';
      const userBody = `
        <p>Hello <strong>${cleanName}</strong>,</p>
        <p>Thank you for reaching out to AppLedger Support. We received your message regarding <strong>${cleanSubject}</strong> and will reply within 24 hours.</p>
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
      console.error('Resend Email Delivery Error (Contact):', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We received your message and will reply within 24 hours.',
    });
  } catch (error) {
    console.error('API Error (/api/contact):', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
