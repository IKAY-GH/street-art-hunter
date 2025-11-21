# 🎨 Schéma Complet du Fonctionnement - Street Art Hunter

## 📊 Vue d'Ensemble de l'Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          UTILISATEUR                                     │
│                    (Navigateur Web - Port 3001)                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite)                            │
│                         client/ (Port 3001)                             │
├─────────────────────────────────────────────────────────────────────────┤
│  Router (react-router-dom)                                              │
│  ├─ / (Accueil)                                                         │
│  ├─ /connexion (Connexion)                                              │
│  ├─ /inscription (Inscription)                                          │
│  ├─ /chasse (Chasse au Street Art)                                      │
│  ├─ /gallerie (Galerie des découvertes)                                 │
│  ├─ /MapComponent (Carte interactive)                                   │
│  ├─ /classement (Classement des joueurs)                                │
│  ├─ /instructions (Règles du jeu)                                       │
│  ├─ /administrateur (Interface admin)                                   │
│  ├─ /equipe (À propos de l'équipe)                                      │
│  ├─ /Cgu (CGU)                                                          │
│  └─ /Mentions-Legales                                                   │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             │ Fetch API
                             │ http://localhost:3310/api/*
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js + TypeScript)                    │
│                         server/ (Port 3310)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  🔌 ROUTES API (router.ts)                                              │
│  ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│  👤 UTILISATEURS                                                         │
│  ├─ POST /api/users/inscription → Créer un compte                       │
│  ├─ GET  /api/users             → Liste des utilisateurs                │
│  └─ GET  /api/users/:id         → Détails d'un utilisateur              │
│                                                                          │
│  🎨 ARTWORKS (Œuvres Street Art)                                        │
│  ├─ GET  /api/artworks          → Liste toutes les œuvres               │
│  ├─ GET  /api/artworks/:id      → Détails d'une œuvre                   │
│  └─ POST /api/artworks          → Créer une œuvre (admin)               │
│                                                                          │
│  👨‍🎨 ARTISTS (Artistes)                                                   │
│  ├─ GET  /api/artist            → Liste tous les artistes               │
│  ├─ GET  /api/artist/:id        → Détails d'un artiste                  │
│  └─ POST /api/artist            → Créer un artiste (admin)              │
│                                                                          │
│  📸 DISCOVERED (Découvertes)                                            │
│  ├─ POST /api/discovered        → Marquer une œuvre découverte + photo  │
│  └─ GET  /discovered            → Récupérer les découvertes              │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  🧩 MODULES (Architecture MVC)                                          │
│  ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│  modules/user/                                                           │
│  ├─ usersActions.ts    → Controllers (browse, read, add, login)         │
│  └─ usersRepository.ts → Data Access Layer (SQL queries)                │
│                                                                          │
│  modules/artwork/                                                        │
│  ├─ artworkActions.ts    → Controllers                                  │
│  └─ artworkRepository.ts → Data Access Layer                            │
│                                                                          │
│  modules/artist/                                                         │
│  ├─ artistActions.ts    → Controllers                                   │
│  └─ artistRepository.ts → Data Access Layer                             │
│                                                                          │
│  modules/discovered/                                                     │
│  ├─ discoveredActions.ts    → Controllers                               │
│  ├─ discoveredRepository.ts → Data Access Layer                         │
│  └─ discoveredRouter.ts     → Routes spécifiques                        │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ⚙️ MIDDLEWARES                                                          │
│  ────────────────────────────────────────────────────────────────────   │
│  ├─ multer.ts  → Upload de fichiers (photos)                            │
│  └─ uploads.ts → Gestion des fichiers uploadés                          │
│                                                                          │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             │ MySQL Queries
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    BASE DE DONNÉES (MySQL)                              │
│                      schema_sah_v1 (Port 3306)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📊 TABLES                                                               │
│                                                                          │
│  ┌──────────────┐                                                       │
│  │    user      │                                                       │
│  ├──────────────┤                                                       │
│  │ id (PK)      │                                                       │
│  │ email        │                                                       │
│  │ pseudo       │                                                       │
│  │ password_hash│                                                       │
│  │ is_admin     │← Détermine le rôle (0=user, 1=admin)                 │
│  │ first_name   │                                                       │
│  │ last_name    │                                                       │
│  │ zip_code     │                                                       │
│  │ avatar_url   │                                                       │
│  └──────────────┘                                                       │
│         │                                                                │
│         │ user_id (FK)                                                  │
│         ▼                                                                │
│  ┌─────────────────────┐                                                │
│  │ discovered_artwork  │                                                │
│  ├─────────────────────┤                                                │
│  │ id (PK)             │                                                │
│  │ user_id (FK)        │→ Relie à user.id                               │
│  │ artwork_id (FK)     │→ Relie à artwork.id                            │
│  │ photo_url           │← Photo prise par l'utilisateur                 │
│  │ discovered_at       │                                                │
│  └─────────────────────┘                                                │
│         │                                                                │
│         │ artwork_id (FK)                                               │
│         ▼                                                                │
│  ┌──────────────┐          ┌──────────────┐                            │
│  │   artwork    │          │    artist    │                            │
│  ├──────────────┤          ├──────────────┤                            │
│  │ id (PK)      │          │ id (PK)      │                            │
│  │ title        │          │ name         │                            │
│  │ description  │          │ bio          │                            │
│  │ image_url    │          │ profile_img  │                            │
│  │ latitude     │          └──────────────┘                            │
│  │ longitude    │                 ▲                                     │
│  │ points       │                 │                                     │
│  │ artist_id(FK)│─────────────────┘                                     │
│  └──────────────┘                                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données Détaillés

### 1️⃣ INSCRIPTION D'UN UTILISATEUR

```
┌─────────────┐
│ UTILISATEUR │ Remplit le formulaire (pseudo, email, password, etc.)
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Frontend: Inscription.tsx│
└──────┬──────────────────┘
       │ POST /api/users/inscription
       │ Body: { pseudo, email, password, first_name, last_name, zip_code }
       ▼
┌──────────────────────────────┐
│ Backend: router.ts           │
│ POST /api/users/inscription  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Middleware: hashPassword     │ Hash le mot de passe avec argon2
│ usersActions.hashPassword    │ password → password_hash
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Controller: usersActions.add │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Repository: usersRepository    │ INSERT INTO user (...)
│ create(user)                   │
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────┐
│ Base de données  │ Stocke l'utilisateur (is_admin = 0 par défaut)
│ Table: user      │
└──────┬───────────┘
       │
       │ Retour: insertId
       ▼
┌─────────────────────────┐
│ Frontend reçoit         │ Confirmation + redirection
│ { insertId: 42 }        │
└─────────────────────────┘
```

### 2️⃣ CHASSE AU STREET ART (Découverte d'une œuvre)

```
┌─────────────┐
│ UTILISATEUR │ Navigue sur la carte, trouve une œuvre, prend une photo
└──────┬──────┘
       │
       ▼
┌────────────────────────┐
│ Frontend: Chasse.tsx   │
│ ou MapComponent.tsx    │
└──────┬─────────────────┘
       │ 1. Affiche la carte avec Leaflet
       │ 2. Charge les artworks depuis API
       │ GET /api/artworks
       ▼
┌──────────────────────────────┐
│ Backend: artworkActions      │
│ browse() → Liste des œuvres  │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Repository: artworkRepository  │ SELECT * FROM artwork
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────┐
│ Base de données  │ Retourne toutes les œuvres avec lat/long
│ Table: artwork   │
└──────┬───────────┘
       │
       │ Retour: [{ id, title, latitude, longitude, ... }]
       ▼
┌─────────────────────────┐
│ Frontend affiche les    │ Markers sur la carte
│ œuvres sur la carte     │
└──────┬──────────────────┘
       │
       │ User clique sur une œuvre et upload une photo
       ▼
┌────────────────────────┐
│ Frontend: Chasse.tsx   │
└──────┬─────────────────┘
       │ POST /api/discovered
       │ FormData: { artwork_id, user_id, photo (file) }
       ▼
┌──────────────────────────────┐
│ Backend: router.ts           │
│ POST /api/discovered         │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Middleware: multer           │ Upload de la photo
│ upload.single("photo")       │ → public/uploads/photo.jpg
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Controller: discoveredActions  │
│ add() → Enregistre découverte  │
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Repository: discoveredRepository │ INSERT INTO discovered_artwork
│ create(discovered)               │ (user_id, artwork_id, photo_url)
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Base de données          │ Enregistre la découverte
│ Table: discovered_artwork│
└──────┬───────────────────┘
       │
       │ Retour: insertId
       ▼
┌─────────────────────────┐
│ Frontend reçoit         │ Confirmation + points ajoutés
│ { success: true }       │
└─────────────────────────┘
```

### 3️⃣ GALERIE DES DÉCOUVERTES

```
┌─────────────┐
│ UTILISATEUR │ Visite /gallerie
└──────┬──────┘
       │
       ▼
┌────────────────────────┐
│ Frontend: gallerie.tsx │
└──────┬─────────────────┘
       │ GET /discovered
       ▼
┌──────────────────────────────┐
│ Backend: discoveredRouter    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Repository: discoveredRepository │ SELECT * FROM discovered_artwork
│ + JOIN avec artwork et artist    │ JOIN artwork ON ...
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Base de données          │ Retourne découvertes + infos artwork
│ Tables: discovered_artwork│
│         artwork          │
│         artist           │
└──────┬───────────────────┘
       │
       │ Retour: [{
       │   discovered_artwork: {...},
       │   artwork: { title, image_url, ... },
       │   artist: { name, ... }
       │ }]
       ▼
┌─────────────────────────┐
│ Frontend affiche        │ Grille de photos découvertes
│ galerie avec photos     │ avec infos artwork
└─────────────────────────┘
```

### 4️⃣ INTERFACE ADMINISTRATEUR

```
┌─────────────┐
│ ADMIN       │ Accède à /administrateur
└──────┬──────┘
       │
       ▼
┌────────────────────────────────┐
│ Frontend: administrateur.tsx   │
└──────┬─────────────────────────┘
       │
       │ 1. Créer une œuvre
       │ POST /api/artworks
       │ Body: { title, description, latitude, longitude, artist_id, image_url }
       ▼
┌──────────────────────────────┐
│ Backend: artworkActions.add  │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Repository: artworkRepository  │ INSERT INTO artwork (...)
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────┐
│ Base de données  │ Nouvelle œuvre ajoutée
│ Table: artwork   │
└──────────────────┘

       │
       │ 2. Créer un artiste
       │ POST /api/artist
       │ Body: { name, bio, profile_image_url }
       ▼
┌──────────────────────────────┐
│ Backend: artistActions.add   │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Repository: artistRepository   │ INSERT INTO artist (...)
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────┐
│ Base de données  │ Nouvel artiste ajouté
│ Table: artist    │
└──────────────────┘
```

### 5️⃣ CLASSEMENT DES JOUEURS

```
┌─────────────┐
│ UTILISATEUR │ Visite /classement
└──────┬──────┘
       │
       ▼
┌────────────────────────┐
│ Frontend: classement.tsx│
└──────┬─────────────────┘
       │ GET /api/users (pour récupérer tous les utilisateurs)
       ▼
┌──────────────────────────────┐
│ Backend: usersActions.browse │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ Repository: usersRepository    │ SELECT * FROM user
│ readAll()                      │
└──────┬─────────────────────────┘
       │
       ▼
┌──────────────────┐
│ Base de données  │ Retourne tous les utilisateurs
│ Table: user      │
└──────┬───────────┘
       │
       │ Calcul côté frontend ou backend :
       │ COUNT des discovered_artwork par user_id
       │ SUM des points (artwork.points)
       ▼
┌─────────────────────────┐
│ Frontend affiche        │ Classement trié par score
│ tableau des scores      │
└─────────────────────────┘
```

---

## 🗂️ Structure des Dossiers

```
street-art-hunter/
│
├── client/                          # FRONTEND (React + Vite)
│   ├── src/
│   │   ├── App.tsx                  # Composant racine (Navigation + Outlet)
│   │   ├── main.tsx                 # Point d'entrée + Router
│   │   │
│   │   ├── assets/                  # Ressources statiques
│   │   │   ├── font-family/
│   │   │   ├── icon/
│   │   │   ├── images/
│   │   │   └── styles/              # CSS globaux
│   │   │       ├── global.css
│   │   │       ├── page-layout.css
│   │   │       └── reset.css
│   │   │
│   │   ├── components/              # Composants réutilisables
│   │   │   ├── ArtworkCard.tsx      # Carte d'une œuvre
│   │   │   ├── ArtworkList.tsx      # Liste d'œuvres
│   │   │   ├── FooterComponent.tsx
│   │   │   ├── LocationInput.tsx
│   │   │   ├── navigation.tsx       # Navigation principale
│   │   │   ├── AdminRoute.tsx       # ✅ Protection route admin
│   │   │   ├── ProtectedRoute.tsx   # ✅ Protection route user
│   │   │   └── Tabs/                # Système d'onglets (admin)
│   │   │
│   │   ├── pages/                   # Pages de l'application
│   │   │   ├── accueil.tsx          # Page d'accueil
│   │   │   ├── Chasse.tsx           # 🎯 Chasse au street art
│   │   │   ├── MapComponent.tsx     # 🗺️ Carte interactive (Leaflet)
│   │   │   ├── gallerie.tsx         # 📸 Galerie des découvertes
│   │   │   ├── classement.tsx       # 🏆 Classement des joueurs
│   │   │   ├── Instructions.tsx     # 📋 Règles du jeu
│   │   │   ├── administrateur/      # 🔧 Interface admin
│   │   │   │   └── administrateur.tsx
│   │   │   ├── Auth/                # 🔐 Authentification
│   │   │   │   ├── connexion.tsx
│   │   │   │   └── inscription.tsx
│   │   │   ├── Equipe.tsx
│   │   │   ├── Cgu.tsx
│   │   │   ├── MentionsLegales.tsx
│   │   │   └── Erreur.tsx
│   │   │
│   │   ├── services/                # ✅ Services API
│   │   │   ├── api.ts               # Wrapper fetch avec JWT
│   │   │   └── authService.ts       # Gestion auth (login, register, logout)
│   │   │
│   │   ├── data/                    # Données mock (développement)
│   │   │   └── mockArtworks.ts
│   │   │
│   │   └── types/                   # Types TypeScript
│   │
│   ├── public/                      # Assets publics
│   │   └── street-art/              # Images des œuvres
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── server/                          # BACKEND (Express + TypeScript)
│   ├── src/
│   │   ├── main.ts                  # Point d'entrée du serveur
│   │   ├── app.ts                   # Configuration Express (CORS, middlewares)
│   │   ├── router.ts                # 🚦 Routes API centralisées
│   │   │
│   │   ├── modules/                 # Modules métiers (MVC)
│   │   │   ├── user/
│   │   │   │   ├── usersActions.ts     # Controllers (browse, read, add, login)
│   │   │   │   └── usersRepository.ts  # Accès BDD (SQL queries)
│   │   │   │
│   │   │   ├── artwork/
│   │   │   │   ├── artworkActions.ts
│   │   │   │   └── artworkRepository.ts
│   │   │   │
│   │   │   ├── artist/
│   │   │   │   ├── artistActions.ts
│   │   │   │   └── artistRepository.ts
│   │   │   │
│   │   │   └── discovered/
│   │   │       ├── discoveredActions.ts
│   │   │       ├── discoveredRepository.ts
│   │   │       └── discoveredRouter.ts
│   │   │
│   │   ├── middlewares/             # Middlewares Express
│   │   │   ├── auth.ts              # ✅ authenticate, isAdmin (JWT)
│   │   │   ├── multer.ts            # Upload fichiers
│   │   │   └── uploads.ts
│   │   │
│   │   ├── utils/                   # Utilitaires
│   │   │   └── jwt.ts               # ✅ generateToken, verifyToken
│   │   │
│   │   └── types/                   # Types TypeScript
│   │
│   ├── database/
│   │   ├── client.ts                # Client MySQL
│   │   ├── schema.sql               # Schéma de la BDD
│   │   ├── checkConnection.ts
│   │   │
│   │   └── fixtures/                # Seeders (données de test)
│   │       ├── UserSeeder.ts
│   │       ├── ArtistSeeder.ts
│   │       ├── ArtworkSeeder.ts
│   │       └── Discovered_artworksSeeder.ts
│   │
│   ├── public/
│   │   ├── assets/images/
│   │   └── uploads/                 # 📁 Photos uploadées par users
│   │
│   ├── bin/
│   │   ├── migrate.ts               # Migration BDD
│   │   ├── seed.ts                  # Seed BDD
│   │   └── createAdmin.ts           # ✅ Script création admin
│   │
│   ├── .env                         # Variables d'environnement
│   ├── package.json
│   └── tsconfig.json
│
├── GUIDE_JWT_AUTHENTICATION.md      # ✅ Documentation JWT
├── GUIDE_GESTION_UTILISATEURS.md    # ✅ Documentation gestion users
└── README.md
```

---

## 🔐 Gestion de la Sécurité (État Actuel)

### ⚠️ ACTUELLEMENT (Sans JWT actif)

```
┌─────────────────────────────────────────────┐
│ FRONTEND                                    │
│ ────────────────────────────────────────    │
│ ✅ Routes accessibles à tous                 │
│ ❌ Pas de protection des routes             │
│ ❌ /administrateur accessible sans login    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BACKEND                                     │
│ ────────────────────────────────────────    │
│ ✅ Hash des mots de passe (argon2)          │
│ ❌ Pas de vérification JWT sur les routes   │
│ ❌ Pas de distinction user/admin            │
└─────────────────────────────────────────────┘
```

### ✅ AVEC JWT (À implémenter - fichiers déjà créés)

Les fichiers nécessaires existent déjà sur la branche `dev-with-auth` :

- `server/src/utils/jwt.ts`
- `server/src/middlewares/auth.ts`
- `client/src/services/api.ts`
- `client/src/services/authService.ts`
- `client/src/components/AdminRoute.tsx`
- `client/src/components/ProtectedRoute.tsx`

---

## 📱 Fonctionnalités Principales

### 🎮 CÔTÉ UTILISATEUR

1. **Inscription/Connexion**

   - Créer un compte
   - Se connecter
   - Mot de passe hashé (argon2)

2. **Chasse au Street Art**

   - Voir les œuvres sur une carte (Leaflet)
   - Prendre une photo d'une œuvre
   - Marquer comme découverte
   - Gagner des points

3. **Galerie**

   - Voir toutes ses découvertes
   - Photos uploadées
   - Infos sur les œuvres

4. **Classement**

   - Voir son score
   - Comparer avec autres joueurs

5. **Informations**
   - Instructions du jeu
   - À propos de l'équipe
   - CGU / Mentions légales

### 🔧 CÔTÉ ADMINISTRATEUR

1. **Gestion des Œuvres**

   - Créer une nouvelle œuvre (titre, description, coordonnées GPS, photo)
   - Assigner un artiste

2. **Gestion des Artistes**

   - Créer un nouvel artiste (nom, bio, photo)

3. **Visualisation**
   - Voir toutes les découvertes des utilisateurs
   - Statistiques (via les onglets)

---

## 🔄 Flux de Données Simplifié

```
USER → FRONTEND → BACKEND → DATABASE
                     ↓
              (Controller)
                     ↓
              (Repository)
                     ↓
                (SQL Query)
                     ↓
               ← RESPONSE ←
```

---

Ce schéma représente l'état actuel de votre application. Voulez-vous que j'ajoute des détails sur une partie spécifique ou que je crée un schéma visuel pour une fonctionnalité particulière ?
