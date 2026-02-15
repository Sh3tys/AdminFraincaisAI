# AdminFrançais 🇫🇷

**Application web gratuite pour simplifier vos démarches administratives en France**

AdminFrançais est un assistant intelligent qui vous aide à comprendre et gérer vos situations administratives (lettres de banque, contrats, abonnements, déménagement, aides sociales, etc.). Obtenez des guides personnalisés, des actions concrètes à suivre, et des modèles de lettres adaptés à votre situation.

## ✨ Fonctionnalités

- 🤖 **Assistant IA intelligent** utilisant Qwen2.5-7B-Instruct via Hugging Face
- 📋 **Réponses structurées** avec étapes détaillées, points importants, et modèles
- 🔒 **100% gratuit** - Aucun coût de déploiement ou d'utilisation
- 💾 **Historique local** - Vos données restent dans votre navigateur
- 📱 **Responsive** - Fonctionne sur mobile, tablette et desktop
- ⚡ **Rapide** - Architecture serverless avec Next.js

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ installé sur votre machine
- Un compte gratuit Hugging Face (pour l'API key)

### Installation locale

1. **Cloner ou télécharger le projet**
   ```bash
   cd "c:\Users\admin\Desktop\Mes progs\AdminFrancais"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'API Hugging Face**
   
   a. Créez un compte gratuit sur [Hugging Face](https://huggingface.co/join)
   
   b. Générez une clé API sur [Settings > Access Tokens](https://huggingface.co/settings/tokens)
   
   c. Créez un fichier `.env.local` à la racine du projet :
   ```bash
   HUGGINGFACE_API_KEY=votre_clé_api_ici
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application**
   
   Visitez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📦 Déploiement

### Déploiement sur Vercel (Recommandé)

Vercel est la plateforme recommandée car elle est créée par les développeurs de Next.js.

#### Option 1 : Déploiement via l'interface web

1. Créez un compte gratuit sur [Vercel](https://vercel.com/signup)
2. Cliquez sur "New Project"
3. Importez votre repository Git (GitHub, GitLab, Bitbucket)
4. Vercel détectera automatiquement Next.js
5. Ajoutez la variable d'environnement :
   - Name: `HUGGINGFACE_API_KEY`
   - Value: votre clé API Hugging Face
6. Cliquez sur "Deploy"

#### Option 2 : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter la variable d'environnement
vercel env add HUGGINGFACE_API_KEY
```

### Déploiement sur Netlify

1. Créez un compte gratuit sur [Netlify](https://app.netlify.com/signup)
2. Installez Netlify CLI :
   ```bash
   npm install -g netlify-cli
   ```
3. Connectez-vous :
   ```bash
   netlify login
   ```
4. Déployez :
   ```bash
   netlify deploy --prod
   ```
5. Ajoutez la variable d'environnement dans le dashboard Netlify :
   - Site Settings > Build & Deploy > Environment
   - Key: `HUGGINGFACE_API_KEY`
   - Value: votre clé API

## 🏗️ Structure du projet

```
AdminFrancais/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.js          # API route pour l'IA
│   ├── layout.js                  # Layout racine avec métadonnées
│   ├── page.js                    # Page principale
│   └── globals.css                # Styles globaux
├── components/
│   ├── Header.js                  # En-tête de l'application
│   ├── InputForm.js               # Formulaire de saisie
│   ├── ResponseDisplay.js         # Affichage des réponses IA
│   └── Footer.js                  # Pied de page
├── lib/
│   └── constants.js               # Prompt système et constantes
├── .env.example                   # Template des variables d'environnement
├── .gitignore                     # Fichiers à ignorer par Git
├── next.config.js                 # Configuration Next.js
├── package.json                   # Dépendances et scripts
├── vercel.json                    # Configuration Vercel
└── README.md                      # Ce fichier
```

## 🔧 Technologies utilisées

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **UI** : React 18 avec CSS vanilla
- **IA** : [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index) avec Qwen2.5-7B-Instruct
- **Déploiement** : Vercel / Netlify (serverless)
- **Stockage** : localStorage (côté client uniquement)

## 💡 Utilisation

1. **Décrivez votre situation** dans le champ de texte (ex: "J'ai reçu une lettre de ma banque pour clôture de compte")

2. **Cliquez sur "Obtenir de l'aide"** pour générer un guide personnalisé

3. **Consultez la réponse structurée** avec :
   - 📋 Titre et aperçu de la situation
   - ✅ Actions à suivre étape par étape
   - ⚠️ Points importants à surveiller
   - 📝 Modèle de message (si applicable)
   - 💡 Résumé final
   - ⚖️ Avertissement légal

4. **Options supplémentaires** :
   - "Expliquer plus simplement" : obtenir une version simplifiée
   - "Générer un modèle de lettre" : créer un template personnalisé

5. **Historique** : vos 10 dernières recherches sont sauvegardées localement

## ⚠️ Avertissements importants

- ⚖️ **Pas de conseil juridique** : Cette application fournit des informations générales, pas des conseils juridiques. Consultez un professionnel pour des situations complexes.
- 🔒 **Confidentialité** : Vos données ne sont pas stockées sur nos serveurs. L'historique est uniquement dans votre navigateur.
- 🆓 **Limites gratuites** : L'API Hugging Face gratuite peut avoir des temps de réponse variables et des limites de taux.

## 🐛 Dépannage

### Le modèle IA est en cours de chargement

Si vous voyez ce message, attendez 20-30 secondes et réessayez. Les modèles Hugging Face en tier gratuit peuvent nécessiter un "cold start".

### Erreur de clé API

Vérifiez que :
1. Votre clé API Hugging Face est correcte
2. La variable d'environnement `HUGGINGFACE_API_KEY` est bien configurée
3. Vous avez redémarré le serveur après avoir ajouté la clé

### Erreur de build

```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 Scripts disponibles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Démarrer en production (après build)
npm start

# Linter
npm run lint
```

## 🤝 Contribution

Ce projet est open source. Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Remerciements

- [Hugging Face](https://huggingface.co/) pour l'API d'inférence gratuite
- [Alibaba Cloud](https://github.com/QwenLM) pour le modèle Qwen2.5
- [Vercel](https://vercel.com/) pour l'hébergement gratuit
- La communauté Next.js

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la [documentation Next.js](https://nextjs.org/docs)
- Consultez la [documentation Hugging Face](https://huggingface.co/docs)

---

**Fait avec ❤️ pour simplifier les démarches administratives en France**
