# 📧 Configuration Resend - Guide Complet

Ce guide vous explique comment configurer Resend pour recevoir les messages du formulaire de contact dans votre boîte email professionnelle **<contact@esthelys.com>**.

## 🎯 Pourquoi Resend ?

- ✅ **Professionnel** : API moderne et fiable
- ✅ **Sécurisé** : Clé API côté serveur uniquement
- ✅ **Simple** : Configuration rapide
- ✅ **Gratuit** : 100 emails/jour (3000/mois)
- ✅ **Qualité** : Meilleure délivrabilité qu'EmailJS

---

## 📋 Étape 1 : Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Cliquez sur **"Sign Up"**
3. Créez votre compte (gratuit)

---

## 🔑 Étape 2 : Obtenir votre clé API

1. Connectez-vous à votre tableau de bord Resend
2. Allez dans **"API Keys"** dans le menu de gauche
3. Cliquez sur **"Create API Key"**
4. Donnez-lui un nom : `esthelys-website`
5. Copiez la clé (elle commence par `re_`)
6. ⚠️ **IMPORTANT** : Sauvegardez-la immédiatement, vous ne pourrez plus la voir après

---

## ✉️ Étape 3 : Configurer votre domaine (Optionnel mais recommandé)

### Option A : Utiliser l'email de test Resend (pour débuter)

Resend vous fournit automatiquement : `onboarding@resend.dev`

- ✅ Prêt immédiatement
- ⚠️ Emails marqués comme "via resend.dev"

### Option B : Utiliser votre propre domaine (recommandé pour la production)

1. Dans Resend, allez dans **"Domains"**
2. Cliquez sur **"Add Domain"**
3. Entrez votre domaine : `esthelys.com`
4. Suivez les instructions pour ajouter les enregistrements DNS :
   - **SPF** : Authentification de l'expéditeur
   - **DKIM** : Signature des emails
   - **DMARC** : Politique de sécurité

5. Attendez la vérification (peut prendre jusqu'à 72h)
6. Une fois vérifié, vous pourrez utiliser : `noreply@esthelys.com`

---

## ⚙️ Étape 4 : Configurer les variables d'environnement

Ouvrez le fichier `.env` à la racine du projet et modifiez les valeurs :

```env
# Votre clé API Resend (copiée à l'étape 2)
RESEND_API_KEY=re_VotreCléAPIIci

# Email expéditeur
# Pour tests : onboarding@resend.dev
# Avec domaine vérifié : noreply@esthelys.com
RESEND_FROM_EMAIL=onboarding@resend.dev

# Votre email professionnel qui recevra les messages
CONTACT_EMAIL=contact@esthelys.com

# Port du serveur (par défaut 3001)
PORT=3001

# URL du frontend (ne pas modifier en développement)
CLIENT_URL=http://localhost:5173

# URL de l'API pour le frontend (ne pas modifier en développement)
VITE_API_URL=http://localhost:3001/api
```

---

## 🚀 Étape 5 : Démarrer l'application

### Option 1 : Démarrer Frontend + Backend en même temps

```bash
npm run dev
```

Cette commande lance :

- 🎨 **Frontend** sur <http://localhost:5173>
- 🔧 **Backend** sur <http://localhost:3001>

### Option 2 : Démarrer séparément

**Terminal 1 - Frontend :**

```bash
npm run dev:client
```

**Terminal 2 - Backend :**

```bash
npm run dev:server
```

---

## 🧪 Étape 6 : Tester le formulaire

1. Ouvrez <http://localhost:5173>
2. Allez sur la page **Contact**
3. Remplissez le formulaire :
   - Nom : Votre nom
   - Téléphone : Un numéro valide
   - Message : Un message de test
4. Cliquez sur **"Envoyer le Message"**
5. Vérifiez votre boîte email **<contact@esthelys.com>**

---

## 📊 Architecture de la solution

```
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│                 │          │                 │          │                 │
│   FRONTEND      │  POST    │    BACKEND      │  API     │     RESEND      │
│   (React)       │─────────▶│    (Express)    │─────────▶│   (Email API)   │
│                 │          │                 │          │                 │
│  localhost:5173 │          │  localhost:3001 │          │   resend.com    │
└─────────────────┘          └─────────────────┘          └─────────────────┘
                                                                    │
                                                                    ▼
                                                          ┌─────────────────┐
                                                          │                 │
                                                          │  Votre Email    │
                                                          │  contact@       │
                                                          │  esthelys.com   │
                                                          └─────────────────┘
```

---

## 🔐 Sécurité

### ✅ Ce qui est sécurisé

1. **Clé API côté serveur** : Jamais exposée au client
2. **Validation des données** : Côté client ET serveur
3. **Protection XSS** : Les données sont nettoyées
4. **CORS configuré** : Seulement localhost en dev
5. **Rate limiting** : À ajouter en production
6. **Variables d'environnement** : `.env` ignoré par Git

### ⚠️ Pour la production

Ajoutez ces mesures supplémentaires :

1. **Rate limiting** :

```bash
npm install express-rate-limit
```

2. **Helmet.js** pour les headers de sécurité :

```bash
npm install helmet
```

3. **Variables d'environnement de production** :
   - Utilisez les variables d'environnement de votre plateforme d'hébergement
   - Ne commitez JAMAIS le fichier `.env`

---

## 🌐 Déploiement en Production

### Backend (API)

**Options recommandées :**

1. **Railway.app** (Recommandé) :
   - Gratuit pour commencer
   - Facile à configurer
   - Variables d'environnement sécurisées

2. **Render.com** :
   - Plan gratuit disponible
   - Déploiement automatique depuis Git

3. **Vercel** (Serverless) :
   - Gratuit
   - Nécessite une adaptation en serverless functions

### Frontend (React)

**Options :**

1. **Vercel** (Recommandé pour React) :
   - Gratuit
   - Optimisé pour Vite/React
   - Déploiement automatique

2. **Netlify** :
   - Gratuit
   - Simple à configurer

3. **Cloudflare Pages** :
   - Gratuit
   - Très rapide

### Configuration Production

1. Déployez le backend d'abord
2. Notez l'URL du backend : `https://votre-api.railway.app`
3. Modifiez `VITE_API_URL` dans votre hébergement frontend
4. Modifiez `CLIENT_URL` dans les variables du backend
5. Utilisez votre domaine vérifié pour `RESEND_FROM_EMAIL`

---

## 📁 Structure des fichiers

```
Esthétique/
├── .env                    # Variables d'environnement (ne pas commiter)
├── .env.example            # Exemple de configuration
├── RESEND_SETUP.md         # Ce guide
├── package.json            # Scripts npm
├── server/
│   ├── index.js            # API Express avec Resend
│   └── package.json        # Dépendances backend
└── src/
    └── pages/
        └── Contact.tsx     # Formulaire de contact
```

---

## ❓ FAQ

### Q : Combien d'emails puis-je envoyer ?

**R :** Plan gratuit Resend : 100 emails/jour (3000/mois)

### Q : Puis-je utiliser Gmail comme expéditeur ?

**R :** Non, vous devez utiliser un domaine vérifié ou `onboarding@resend.dev`

### Q : Les emails vont dans les spams ?

**R :** Avec un domaine vérifié et les bons enregistrements DNS, la délivrabilité est excellente

### Q : Comment personnaliser le design de l'email ?

**R :** Modifiez le template HTML dans `server/index.js` ligne 55

### Q : Puis-je recevoir les emails sur plusieurs adresses ?

**R :** Oui, modifiez le champ `to` dans `server/index.js` :

```javascript
to: ['contact@esthelys.com', 'autre@esthelys.com']
```

### Q : Comment ajouter un champ email au formulaire ?

**R :**

1. Ajoutez le champ dans `Contact.tsx`
2. Ajoutez-le dans le body du POST
3. Ajoutez-le dans le template email du serveur

---

## 🆘 Dépannage

### Erreur : "RESEND_API_KEY is not set"

➡️ Vérifiez que votre clé API est bien dans le fichier `.env`

### Erreur : "Failed to fetch"

➡️ Le backend n'est pas démarré. Lancez `npm run dev:server`

### Erreur : "CORS error"

➡️ Vérifiez que `CLIENT_URL` correspond à votre URL frontend

### Les emails n'arrivent pas

➡️ Vérifiez :

1. La clé API Resend est valide
2. L'email `CONTACT_EMAIL` est correct
3. Les logs du serveur pour plus d'infos

---

## 📞 Support

- **Documentation Resend** : [resend.com/docs](https://resend.com/docs)
- **API Reference** : [resend.com/docs/api-reference](https://resend.com/docs/api-reference)
- **Dashboard Resend** : [resend.com/emails](https://resend.com/emails) (voir les emails envoyés)

---

## ✨ Prochaines améliorations possibles

- [ ] Ajouter un champ email au formulaire
- [ ] Copie de confirmation pour l'utilisateur
- [ ] Captcha anti-spam (reCAPTCHA)
- [ ] Rate limiting par IP
- [ ] Sauvegarde des messages dans une base de données
- [ ] Tableau de bord admin pour voir les messages

---

**🎉 Félicitations ! Votre système d'envoi d'emails est opérationnel !**
