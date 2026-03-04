import nodemailer from 'nodemailer';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Alle velden zijn verplicht' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      tls: {
        rejectUnauthorized: process.env.SMTP_TLS_VERIFY !== 'false',
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || 'info@defabriek.org',
      replyTo: email,
      subject: `[De Fabriek Contact] ${subject}`,
      text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`,
      html: `
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP timeout na 15 seconden')), 15000)
      ),
    ]);

    console.log('✅ Mail verzonden');
    return new Response(JSON.stringify({ success: true, message: 'Bericht verzonden' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error?.message || String(error);
    console.error('Mail error:', msg);
    if (error?.response) console.error('SMTP response:', error.response);
    return new Response(JSON.stringify({ error: 'Kon bericht niet versturen', details: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/contact' };
