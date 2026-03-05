import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

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

// Verify config on startup
if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn('⚠️  SMTP config incomplete. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
}

app.post('/api/contact', async (req, res) => {
  console.log('📩 Contact form received');
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }

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
    res.json({ success: true, message: 'Bericht verzonden' });
  } catch (error) {
    const msg = error?.message || String(error);
    console.error('Mail error:', msg);
    if (error?.response) console.error('SMTP response:', error.response);
    res.status(500).json({ error: 'Kon bericht niet versturen', details: msg });
  }
});

// --- Trick Counter ---

app.get('/api/counter', async (_req, res) => {
  const { data, error } = await supabase
    .from('trick_counter')
    .select('count')
    .eq('id', 1)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ count: data.count });
});

app.post('/api/counter/increment', async (req, res) => {
  const { slug, username } = req.body || {};
  // Increment global counter
  const { data: globalData, error: globalError } = await supabase.rpc('increment_trick_counter');
  if (globalError) return res.status(500).json({ error: globalError.message });

  // Increment user counter if slug provided
  let userCount = null;
  if (slug && username) {
    const { data: userData, error: userError } = await supabase.rpc('increment_user_tricks', {
      p_slug: slug,
      p_username: username,
    });
    if (!userError) userCount = userData;
  }

  res.json({ count: globalData, userCount });
});

// --- Leaderboard ---

app.get('/api/leaderboard', async (_req, res) => {
  const { data, error } = await supabase
    .from('trick_leaderboard')
    .select('slug, username, count')
    .order('count', { ascending: false })
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ leaderboard: data });
});

// ---------------------

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
