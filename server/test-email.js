import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger le fichier .env depuis le répertoire parent
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log('🧪 Test d\'envoi d\'email avec Resend\n');

  console.log('📋 Configuration actuelle:');
  console.log(`   - Clé API Resend: ${process.env.RESEND_API_KEY ? '✅ Définie' : '❌ Manquante'}`);
  console.log(`   - Email expéditeur: ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}`);
  console.log(`   - Email destinataire: ${process.env.CONTACT_EMAIL || 'contact@esthelys.com'}`);
  console.log('');

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ ERREUR: La clé API Resend n\'est pas définie dans le fichier .env');
    process.exit(1);
  }

  try {
    console.log('📧 Envoi d\'un email de test...\n');

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@esthelys.com',
      subject: '🧪 Test - Configuration Email Esthelys',
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
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
              .success-box {
                background: #d1fae5;
                border-left: 4px solid #10b981;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
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
              <h1 style="margin: 0; font-size: 28px;">✅ Test Réussi !</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Configuration Email Esthelys</p>
            </div>

            <div class="content">
              <div class="success-box">
                <h2 style="margin-top: 0; color: #059669;">🎉 Félicitations !</h2>
                <p style="margin-bottom: 0;">
                  Si vous recevez cet email, cela signifie que votre configuration Resend
                  fonctionne parfaitement. Tous les messages du formulaire de contact seront
                  désormais envoyés à <strong>contact@esthelys.com</strong>.
                </p>
              </div>

              <h3>📋 Informations de test :</h3>
              <ul>
                <li><strong>Email destinataire :</strong> ${process.env.CONTACT_EMAIL || 'contact@esthelys.com'}</li>
                <li><strong>Email expéditeur :</strong> ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}</li>
                <li><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR', {
                  timeZone: 'Europe/Paris',
                  dateStyle: 'full',
                  timeStyle: 'long'
                })}</li>
              </ul>

              <h3>✨ Prochaines étapes :</h3>
              <ol>
                <li>Vérifier votre domaine dans Resend pour utiliser votre propre email expéditeur</li>
                <li>Tester le formulaire de contact sur le site web</li>
                <li>Configurer les règles de filtrage dans votre boîte mail si nécessaire</li>
              </ol>
            </div>

            <div class="footer">
              <p style="margin: 0;">Email de test envoyé depuis le script de configuration Esthelys</p>
              <p style="margin: 10px 0 0 0;">🌸 Esthelys - Institut de Beauté</p>
            </div>
          </body>
        </html>
      `,
      text: `
TEST RÉUSSI !

Si vous recevez cet email, votre configuration Resend fonctionne parfaitement.

Informations de test :
- Email destinataire : ${process.env.CONTACT_EMAIL || 'contact@esthelys.com'}
- Email expéditeur : ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}
- Date du test : ${new Date().toLocaleString('fr-FR')}

Tous les messages du formulaire de contact seront envoyés à contact@esthelys.com.

---
Esthelys - Institut de Beauté
      `
    });

    if (error) {
      console.error('❌ ERREUR lors de l\'envoi:', error);
      process.exit(1);
    }

    console.log('✅ Email envoyé avec succès !');
    console.log(`   - ID de l'email: ${data.id}`);
    console.log(`   - Destinataire: ${process.env.CONTACT_EMAIL || 'contact@esthelys.com'}`);
    console.log('');
    console.log('📬 Vérifiez votre boîte email contact@esthelys.com');
    console.log('   (Pensez à vérifier les spams si vous ne trouvez pas l\'email)');
    console.log('');
    console.log('🎉 Configuration validée avec succès !');

  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    process.exit(1);
  }
}

testEmail();
