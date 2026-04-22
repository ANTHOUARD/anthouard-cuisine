# Collection Anthouard — Cuisine IA

Application web de génération de cartes bistronomiques et fiches techniques avec IA.

---

## Déploiement en 3 étapes (15 minutes)

### Étape 1 — Mettre les fichiers sur GitHub

1. Créez un compte sur **github.com** (gratuit)
2. Cliquez sur le bouton vert **"New"** en haut à gauche
3. Nommez le repository : `anthouard-cuisine`
4. Cliquez **"Create repository"**
5. Cliquez sur **"uploading an existing file"**
6. Glissez-déposez **tous les fichiers** de ce dossier :
   - `vercel.json`
   - `api/claude.js`
   - `public/index.html`
7. Cliquez **"Commit changes"**

---

### Étape 2 — Déployer sur Vercel

1. Créez un compte sur **vercel.com** (gratuit, connectez-vous avec GitHub)
2. Cliquez **"Add New Project"**
3. Sélectionnez votre repository `anthouard-cuisine`
4. Cliquez **"Deploy"** (ne rien changer aux paramètres)
5. Attendez 1 minute — Vercel vous donne une URL du type :
   `https://anthouard-cuisine.vercel.app`

---

### Étape 3 — Configurer vos variables secrètes

Dans Vercel, allez dans votre projet → **Settings → Environment Variables** et ajoutez :

| Nom | Valeur |
|-----|--------|
| `ANTHROPIC_API_KEY` | Votre clé Claude (console.anthropic.com → API Keys) |
| `ACCESS_CODES` | Vos codes d'accès séparés par des virgules |

**Exemple de codes d'accès :**
```
ANTHOUARD2025,CUISINE01,CHEF2025
```

Après avoir ajouté les variables, allez dans **Deployments → cliquez sur les 3 points → Redeploy**.

---

## Utilisation

- Partagez l'URL à vos chefs de partie
- Chacun saisit son code d'accès pour entrer
- L'application fonctionne sur Mac, PC, iPad, iPhone

## Modifier les codes d'accès

Dans Vercel → Settings → Environment Variables → modifier `ACCESS_CODES` → Redeploy.

## Coûts

- **Vercel** : gratuit
- **GitHub** : gratuit  
- **Anthropic API** : environ 0,02 € par carte générée, 0,01 € par fiche technique

---

## Structure des fichiers

```
anthouard-app/
├── vercel.json          ← Configuration Vercel
├── api/
│   └── claude.js        ← Proxy API (cache la clé Anthropic)
├── public/
│   └── index.html       ← Toute l'application
└── README.md            ← Ce fichier
```
