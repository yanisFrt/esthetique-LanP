import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger le fichier .env depuis le répertoire parent
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    // Validation
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    // Validation du numéro de téléphone
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Numéro de téléphone invalide'
      });
    }

    // Sanitize inputs (protection XSS basique)
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone.trim().slice(0, 20);
    const sanitizedMessage = message.trim().slice(0, 1000);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@esthelys.com',
      subject: `Nouveau message de ${sanitizedName} - Site Web Esthelys`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border: 1px solid #e0e0e0;
              }
              .info-row {
                margin: 15px 0;
                padding: 10px;
                background: white;
                border-left: 4px solid #667eea;
                border-radius: 4px;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                border: 1px solid #e0e0e0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
                background: #f0f0f0;
                border-radius: 0 0 10px 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📧 Nouveau Message</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulaire de Contact - Esthelys</p>
            </div>

            <div class="content">
              <div class="info-row">
                <div class="label">👤 Nom du contact</div>
                <div class="value">${sanitizedName}</div>
              </div>

              <div class="info-row">
                <div class="label">📱 Téléphone</div>
                <div class="value">${sanitizedPhone}</div>
              </div>

              <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">💬 Message</div>
                <div class="value" style="white-space: pre-wrap;">${sanitizedMessage}</div>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">Cet email a été envoyé automatiquement depuis le formulaire de contact du site web Esthelys.</p>
              <p style="margin: 10px 0 0 0;">⏰ ${new Date().toLocaleString('fr-FR', {
                timeZone: 'Europe/Paris',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</p>
            </div>
          </body>
        </html>
      `,
      text: `
Nouveau message depuis le site web Esthelys

Nom: ${sanitizedName}
Téléphone: ${sanitizedPhone}

Message:
${sanitizedMessage}

---
Cet email a été envoyé automatiquement le ${new Date().toLocaleString('fr-FR')}.
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'envoi de l\'email'
      });
    }

    console.log('Email sent successfully:', data);

    res.json({
      success: true,
      message: 'Message envoyé avec succès',
      emailId: data.id
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de l\'envoi du message'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur serveur interne'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Resend configured: ${process.env.RESEND_API_KEY ? 'Yes' : 'No'}`);
  console.log(`📬 Contact email: ${process.env.CONTACT_EMAIL || 'contact@esthelys.com'}`);
});
