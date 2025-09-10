const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
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
      secure: false,                     // 587 = STARTTLS (pas SSL direct)
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: {
        minVersion: 'TLSv1.2'
      },
      logger: true,                      // logs dans la console Vercel
      debug: true
    });

    const fromAddr = SMTP_USER.includes('@') ? SMTP_USER : `${SMTP_USER}@free.fr`;

    const info = await transporter.sendMail({
      from: `"Portfolio DG" <${fromAddr}>`,         // Header From (aligné Free)
      to: CONTACT_TO,
      replyTo: email,                               // le visiteur
      sender: fromAddr,                             // Header Sender (optionnel)
      envelope: { from: fromAddr, to: CONTACT_TO }, // MAIL FROM (Return-Path) = Free
      subject: `Nouveau message du portfolio — ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>De :</strong> ${name} &lt;${email}&gt;</p><p>${String(message).replace(/\n/g,'<br>')}</p>`
    });


    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Erreur envoi email.' });
  }
};
