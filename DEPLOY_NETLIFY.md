# 🚀 Guide de Déploiement sur Netlify - Esthelys

Ce guide explique comment déployer votre site Esthelys sur **Netlify** avec les fonctions serverless pour l'envoi d'emails.

---

## 📋 Prérequis

✅ Compte GitHub (pour connecter votre code)
✅ Compte Netlify (gratuit sur https://netlify.com)
✅ Compte Resend avec clé API
✅ Code poussé sur GitHub

---

## 🎯 Architecture Netlify

```
┌─────────────────────────────────────────────┐
│         NETLIFY (Hébergement gratuit)        │
├─────────────────────────────────────────────┤
│                                             │
│  📱 Frontend (React/Vite)                   │
│  ├─ Fichiers statiques (HTML, CSS, JS)     │
│  └─ Hébergé sur CDN mondial                │
│                                             │
│  ⚡ Netlify Functions (Serverless)          │
│  ├─ /api/contact → /.netlify/functions/contact
│  └─ Exécution à la demande (pas de serveur permanent)
│                                             │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│     RESEND      │
│  (Envoi email)  │
└─────────────────┘
```

---

## 🚀 Étape 1 : Préparer le code pour GitHub

### 1.1 Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Site Esthelys prêt pour Netlify"
```

### 1.2 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repo : `esthelys-website`
3. **NE PAS** initialiser avec README (vous en avez déjà un)
4. Cliquez sur "Create repository"

### 1.3 Pousser le code

```bash
git remote add origin https://github.com/VOTRE_USERNAME/esthelys-website.git
git branch -M main
git push -u origin main
```

⚠️ **IMPORTANT** : Vérifiez que le fichier `.env` est bien ignoré par Git (dans `.gitignore`)

---

## 🌐 Étape 2 : Déployer sur Netlify

### 2.1 Connecter votre repository

1. Allez sur https://app.netlify.com
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez **"GitHub"**
4. Autorisez Netlify à accéder à vos repos
5. Sélectionnez le repo `esthelys-website`

### 2.2 Configurer le build

Netlify détectera automatiquement votre configuration grâce au fichier `netlify.toml` !

Vérifiez que les paramètres sont :
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Functions directory** : `netlify/functions`

### 2.3 Ajouter les variables d'environnement

Dans les paramètres Netlify :

1. Allez dans **"Site settings"** → **"Environment variables"**
2. Cliquez sur **"Add a variable"**
3. Ajoutez les variables suivantes :

```
Clé                    Valeur
──────────────────────────────────────────────────
RESEND_API_KEY         re_VotreCléAPIResend
RESEND_FROM_EMAIL      onboarding@resend.dev
CONTACT_EMAIL          contact@esthelys.com
```

⚠️ **IMPORTANT** :
- Pour `CONTACT_EMAIL`, utilisez **yanis.frtfy@gmail.com** pour les tests
- Changez vers **contact@esthelys.com** après avoir vérifié le domaine dans Resend

### 2.4 Déployer

1. Cliquez sur **"Deploy site"**
2. Attendez que le build se termine (1-2 minutes)
3. Votre site sera accessible sur : `https://random-name-123.netlify.app`

---

## ✅ Étape 3 : Tester le déploiement

### 3.1 Vérifier le site

1. Ouvrez l'URL fournie par Netlify
2. Naviguez sur toutes les pages
3. Vérifiez que le design s'affiche correctement

### 3.2 Tester le formulaire de contact

1. Allez sur la page **Contact**
2. Remplissez le formulaire :
   - Nom : Test Netlify
   - Téléphone : 06 12 34 56 78
   - Message : Test depuis Netlify
3. Cliquez sur "Envoyer le Message"
4. Vérifiez votre email (yanis.frtfy@gmail.com)

### 3.3 Déboguer les erreurs

Si le formulaire ne fonctionne pas :

1. **Vérifier les logs Netlify Functions** :
   - Dans Netlify : **"Functions"** → Cliquez sur `contact`
   - Consultez les logs en temps réel

2. **Vérifier les variables d'environnement** :
   - Assurez-vous qu'elles sont bien configurées
   - Redéployez après modification : **"Deploys"** → **"Trigger deploy"** → **"Clear cache and deploy site"**

3. **Console du navigateur** :
   - Ouvrez la console (F12)
   - Regardez les erreurs réseau

---

## 🎨 Étape 4 : Personnaliser le domaine (Optionnel)

### 4.1 Changer le nom du site

1. Dans Netlify : **"Site settings"** → **"Site details"**
2. Cliquez sur **"Change site name"**
3. Choisissez : `esthelys` (si disponible)
4. Votre site sera accessible sur : `https://esthelys.netlify.app`

### 4.2 Utiliser votre propre domaine

Si vous avez acheté `esthelys.com` :

1. Dans Netlify : **"Domain settings"** → **"Add custom domain"**
2. Entrez : `esthelys.com`
3. Ajoutez les enregistrements DNS fournis chez votre registrar
4. Activez HTTPS automatique (gratuit via Let's Encrypt)

---

## 📧 Étape 5 : Configurer l'email professionnel

### Pour recevoir les emails sur contact@esthelys.com :

1. **Vérifier le domaine dans Resend** :
   - Suivez le guide dans `RESEND_SETUP.md`
   - Ajoutez les enregistrements DNS (SPF, DKIM, DMARC)

2. **Mettre à jour les variables Netlify** :
   ```
   CONTACT_EMAIL = contact@esthelys.com
   RESEND_FROM_EMAIL = noreply@esthelys.com
   ```

3. **Redéployer** :
   - **"Deploys"** → **"Trigger deploy"**

---

## 🔄 Étape 6 : Mises à jour automatiques

Netlify se redéploie automatiquement quand vous poussez sur GitHub !

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour du site"
git push

# Netlify détecte le push et redéploie automatiquement ✨
```

Vous pouvez suivre les déploiements dans l'onglet **"Deploys"** de Netlify.

---

## 🐛 Dépannage

### Erreur : "Function failed to execute"

➡️ **Vérifiez les logs** : Netlify → Functions → contact → Logs
➡️ **Cause fréquente** : Variables d'environnement manquantes
➡️ **Solution** : Ajoutez `RESEND_API_KEY` dans les variables Netlify

### Erreur : "CORS error"

➡️ **Cause** : Configuration CORS dans la fonction
➡️ **Solution** : Déjà configurée dans `netlify/functions/contact.js`

### Formulaire ne s'affiche pas

➡️ **Cause** : Erreur de build
➡️ **Solution** : Vérifiez les logs de build dans **"Deploys"**

### Emails n'arrivent pas

➡️ **Vérifiez** :
1. La clé API Resend est valide
2. L'email `CONTACT_EMAIL` est autorisé (yanis.frtfy@gmail.com pour les tests)
3. Les logs de la fonction pour voir l'erreur exacte

---

## 📊 Monitoring et Analytics

### Netlify Analytics (Payant)

Pour voir le trafic de votre site :
- **"Analytics"** → **"Enable Analytics"** (9$/mois)

### Alternative gratuite : Google Analytics

1. Créez un compte Google Analytics
2. Ajoutez le code de tracking dans `index.html`
3. Redéployez

---

## 🔒 Sécurité

### ✅ Ce qui est déjà configuré :

- HTTPS automatique (certificat SSL gratuit)
- Headers de sécurité (X-Frame-Options, etc.)
- Variables d'environnement sécurisées
- Protection CORS

### 🎯 Recommandations supplémentaires :

1. **Rate limiting** :
   - Netlify Functions a un rate limit par défaut
   - Pour plus de contrôle, utilisez Netlify Edge Functions

2. **Authentification** :
   - Ajoutez Netlify Identity si vous avez besoin d'un espace admin

---

## 📈 Limites du plan gratuit Netlify

| Ressource | Limite gratuite |
|-----------|-----------------|
| Bande passante | 100 GB/mois |
| Build minutes | 300 min/mois |
| Fonctions invocations | 125k/mois |
| Fonctions runtime | 100h/mois |
| Sites | Illimité |

➡️ Largement suffisant pour un site vitrine comme Esthelys !

---

## 🎉 Checklist de déploiement

- [ ] Code poussé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Formulaire de contact testé
- [ ] Email reçu avec succès
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] HTTPS activé
- [ ] Domaine Resend vérifié (pour production)

---

## 📞 Support

- **Netlify Docs** : https://docs.netlify.com
- **Netlify Community** : https://answers.netlify.com
- **Resend Docs** : https://resend.com/docs

---

**🌸 Votre site Esthelys est maintenant en ligne et accessible partout dans le monde !**

Profitez de la puissance de Netlify : déploiements automatiques, SSL gratuit, et CDN mondial. 🚀
