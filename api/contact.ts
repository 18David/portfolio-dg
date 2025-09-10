import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }

  try {
    const {
      SMTP_HOST = 'smtp.gmail.com',
      SMTP_PORT = '465',
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO = '18goncalves.david@gmail.com'
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({ message: 'SMTP non configuré.' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true pour 465
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    const info = await transporter.sendMail({
      from: SMTP_USER,               // avec Gmail, utiliser l’utilisateur authentifié
      to: CONTACT_TO,
      replyTo: email,                // répondra au visiteur
      subject: `Nouveau message du portfolio — ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: 'Erreur envoi email.' });
  }
}
