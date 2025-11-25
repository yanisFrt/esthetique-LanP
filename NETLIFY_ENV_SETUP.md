# 🔐 Configuration des Variables d'Environnement Netlify

Guide rapide pour configurer les variables d'environnement sur Netlify.

---

## 📋 Liste des Variables à Configurer

### Variables OBLIGATOIRES :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `RESEND_API_KEY` | `re_QMbUFUvk_2Trvu8X4XXpHGHAjgEaPsSB3` | Clé API Resend (secrète) |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Email expéditeur |
| `CONTACT_EMAIL` | `yanis.frtfy@gmail.com` | Email destinataire (pour tests) |
| `VITE_API_URL` | `/.netlify/functions` | URL de l'API pour le frontend |

---

## 🚀 Comment Configurer dans Netlify

### Étape 1 : Accéder aux paramètres

1. Allez sur https://app.netlify.com
2. Sélectionnez votre site **esthelys-website**
3. Cliquez sur **"Site settings"** (en haut)
4. Dans le menu gauche, cliquez sur **"Environment variables"**

### Étape 2 : Ajouter chaque variable

Pour chaque variable du tableau ci-dessus :

1. Cliquez sur **"Add a variable"**
2. **Key (Clé)** : Copiez le nom exact (ex: `RESEND_API_KEY`)
3. **Values (Valeur)** : Collez la valeur correspondante
4. **Scopes** : Sélectionnez **"Same value for all deploy contexts"**
5. Cliquez sur **"Create variable"**

### Étape 3 : Vérifier

Après avoir ajouté toutes les variables, vous devriez voir :

```
✅ RESEND_API_KEY = re_QMb•••••••
✅ RESEND_FROM_EMAIL = onboarding@resend.dev
✅ CONTACT_EMAIL = yanis.frtfy@gmail.com
✅ VITE_API_URL = /.netlify/functions
```

---

## 🔄 Redéployer après modification

Si vous modifiez une variable :

1. Allez dans **"Deploys"**
2. Cliquez sur **"Trigger deploy"**
3. Sélectionnez **"Clear cache and deploy site"**

---

## 📧 Configuration Email selon l'Environnement

### 🧪 Pour les TESTS (Maintenant)

```env
RESEND_FROM_EMAIL = onboarding@resend.dev
CONTACT_EMAIL = yanis.frtfy@gmail.com
```

**Pourquoi ?**
- Resend en mode sandbox autorise uniquement l'email du propriétaire du compte
- Vous recevrez les emails de test sur yanis.frtfy@gmail.com

### 🏭 Pour la PRODUCTION (Après vérification du domaine)

```env
RESEND_FROM_EMAIL = noreply@esthelys.com
CONTACT_EMAIL = contact@esthelys.com
```

**Comment passer en production ?**
1. Vérifiez le domaine `esthelys.com` dans Resend
2. Ajoutez les enregistrements DNS (SPF, DKIM, DMARC)
3. Attendez la vérification (jusqu'à 72h)
4. Modifiez les variables dans Netlify
5. Redéployez le site

---

## ⚠️ Sécurité

### ✅ Ce qu'il faut faire :

- Configurer `RESEND_API_KEY` dans Netlify (jamais dans le code)
- Garder `.env` dans `.gitignore`
- Ne jamais commiter de clés secrètes

### ❌ Ce qu'il NE faut PAS faire :

- ❌ Mettre la clé API dans le code source
- ❌ Commiter le fichier `.env` sur GitHub
- ❌ Partager la clé API publiquement

---

## 🧪 Tester la Configuration

Après avoir configuré les variables :

1. **Vérifier le build** :
   - Allez dans **"Deploys"** → Sélectionnez le dernier build
   - Cliquez sur **"Deploy log"**
   - Vérifiez qu'il n'y a pas d'erreurs

2. **Tester le formulaire** :
   - Ouvrez votre site Netlify
   - Allez sur la page Contact
   - Remplissez et envoyez le formulaire
   - Vérifiez votre email yanis.frtfy@gmail.com

3. **Vérifier les logs de la fonction** :
   - Allez dans **"Functions"**
   - Cliquez sur **"contact"**
   - Consultez les logs en temps réel

---

## 🐛 Dépannage

### Erreur : "Missing API key"

➡️ **Cause** : Variable `RESEND_API_KEY` non configurée
➡️ **Solution** : Ajoutez la variable dans Netlify et redéployez

### Erreur : "You can only send testing emails to..."

➡️ **Cause** : `CONTACT_EMAIL` n'est pas l'email du propriétaire Resend
➡️ **Solution** : Utilisez `yanis.frtfy@gmail.com` pour les tests

### Les emails n'arrivent pas

➡️ **Vérifiez** :
1. La clé API est correcte
2. L'email destinataire est yanis.frtfy@gmail.com
3. Les logs de la fonction dans Netlify

---

## 📊 Récapitulatif

```bash
# Variables pour Netlify (à configurer dans le dashboard)
RESEND_API_KEY=re_QMbUFUvk_2Trvu8X4XXpHGHAjgEaPsSB3
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=yanis.frtfy@gmail.com
VITE_API_URL=/.netlify/functions
```

---

## ✅ Checklist

- [ ] Variables ajoutées dans Netlify Dashboard
- [ ] Build réussi (sans erreurs)
- [ ] Site déployé et accessible
- [ ] Formulaire de contact testé
- [ ] Email reçu sur yanis.frtfy@gmail.com

---

**Une fois ces 4 variables configurées, votre site sera 100% fonctionnel !** 🚀
