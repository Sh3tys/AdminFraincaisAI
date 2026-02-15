# Démarches Simplifiées 🇫🇷

**Démarches Simplifiées** est un assistant intelligent et professionnel conçu pour aider les citoyens français à naviguer dans la complexité administrative. Propulsé par l'intelligence artificielle (Qwen 2.5), il transforme vos situations confuses en guides clairs, structurés et actionnables.

## ✨ Fonctionnalités Clés

- **Analyse de Situation** : Décrivez votre problème en langage naturel (ex: "Ma banque ferme mon compte", "Je déménage le mois prochain") et obtenez une analyse immédiate.
- **Guides Étape par Étape** : Des instructions précises sur quoi faire, dans quel ordre, et quels documents préparer.
- **Génération de Modèles** : Créez instantanément des modèles de lettres ou d'e-mails personnalisés pour vos démarches (résiliation, demande d'attestation, réclamation).
- **Simplification Interactive** : Une option pour obtenir une explication encore plus simple si le sujet est complexe.
- **Design Professionnel & Sombre** : Une interface moderne, épurée et accessible avec un mode sombre (Dark Mode) intégré pour un confort de lecture optimal.
- **Confidentialité Locale** : Votre historique est sauvegardé localement dans votre navigateur ; rien n'est stocké sur nos serveurs.

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 14+ (App Router)
- **Langage** : JavaScript / React
- **IA** : Qwen v2.5 via Hugging Face Inference API
- **Style** : Vanilla CSS (Design System sur mesure, Glassmorphism)
- **Déploiement** : Vercel / Netlify

## 🚀 Installation Locale

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Sh3tys/AdminFraincaisAI.git
   cd AdminFraincaisAI
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement** :
   Créez un fichier `.env.local` à la racine et ajoutez votre clé Hugging Face :
   ```env
   HF_TOKEN=votre_cle_hugging_face_ici
   ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:3000`.

## 🌐 Déploiement

### Sur Vercel (Recommandé)

1. Connectez votre dépôt GitHub à Vercel.
2. Ajoutez la variable d'environnement `HF_TOKEN` dans le tableau de bord Vercel.
3. Déployez !

## 📖 Comment utiliser ?

1. **Saisissez votre situation** dans le champ de texte principal.
2. **Cliquez sur "Analyser"** pour générer votre guide.
3. **Consultez les sections** :
   - **Aperçu** : Pour comprendre l'essentiel.
   - **Actions** : Les étapes concrètes à suivre.
   - **Points Importants** : Les pièges à éviter.
   - **Modèle** : Copiez le texte pour vos courriers.
4. **Utilisez les boutons d'action** en bas de page pour simplifier davantage ou générer un nouveau modèle.
5. **Basculez entre Mode Clair et Sombre** via le bouton ◐/◑ en haut à droite.

## ⚖️ Avertissement

Ce projet est un outil d'assistance basé sur l'IA. Les informations fournies sont à titre indicatif et ne constituent pas un conseil juridique officiel. En cas de doute, consultez toujours un professionnel ou l'administration concernée.

---
Développé avec ❤️ pour simplifier le quotidien administratif.
