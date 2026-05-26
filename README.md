<div align="center">
    <h1>PassionLecture_294<h1/>
    <img src="./img/imgtitre.png" height="400">
    <br>
    <br>
    <br>
</div>

<div align="center">
    Auteurs : Latif KRASNIQI, David SOTTAS<br>
    ETML - Vennes<br>
    Durée du projet : 32p<br>
    Chef de projet : Grégory CHARMIER
</div><br><br>

## Table des matières

1. [Introduction](#introduction)
2. [Analyse](#analyse)
   - [Planification des tâches](#planification-des-tâches)
   - [Analyse de l'API REST](#analyse-de-lapi-rest)
   - [Analyse de la base de données](#analyse-de-la-base-de-données)
   - [Architecture](#architecture)
3. [Réalisation](#réalisation)
   - [Authentification et gestion des rôles](#authentification-et-gestion-des-rôles)
   - [Sécurité](#sécurité)
4. [Tests](#tests)
5. [Conclusion](#conclusion)
   - [Organisation Git / GitHub](#organisation-git--github)
   - [Conclusion générale](#conclusion-générale)
   - [Conclusion personnelle](#conclusion-personnelle)
   - [Critique de la planification](#critique-de-la-planification)

---

## Introduction

PassionLecture est une application web permettant aux utilisateurs de partager, découvrir et commenter des ouvrages littéraires de toutes catégories. Chaque utilisateur peut créer un compte, ajouter des livres avec leur couverture, les associer à un auteur et un genre, puis consulter ou laisser des avis notés sur les ouvrages des autres membres.

Le projet est découpé en deux parties distinctes. Le **frontend** est développé en **Vue.js 3** avec l'API Composition et communique avec le backend via des requêtes HTTP. Le **backend** est développé avec **AdonisJS 6** (TypeScript) et expose une API REST sécurisée. La persistance des données est assurée par une base de données **MySQL**, pilotée par l'ORM Lucid intégré à AdonisJS.

Ce projet fait suite à une première version entièrement frontend utilisant `json-server` pour simuler un backend. L'objectif de cette itération est de remplacer cette simulation par un vrai backend structuré, avec authentification, validation des données et base de données relationnelle.

> **Fonctionnalités manquantes :** La gestion des rôles (distinction admin / utilisateur), la complétion du CRUD des avis côté frontend ainsi que la recherche de livres n'ont pas été implémentées dans cette version et constituent les principales pistes d'amélioration futures.

---

## Analyse

### Planification des tâches

La gestion des tâches est réalisée via **GitHub Projects**, ce qui permet au chef de projet de suivre l'évolution en temps réel. Les tâches sont organisées en colonnes (To Do / In Progress / Done) et assignées à chaque membre selon les sprints.

> Lien vers le tableau de bord : [GitHub Projects – PassionLecture](https://github.com/AsDeLaGachette/PassionLecture/projects)

Au démarrage du projet, les grandes tâches ont été définies (mise en place du backend, migrations, contrôleurs, authentification, intégration frontend/backend) et affinées en sous-tâches au fur et à mesure de l'avancement.

---

### Analyse de l'API REST

L'API est préfixée par `/api`. La documentation interactive est accessible via `/docs` (Swagger UI généré automatiquement avec `adonis-autoswagger`).

#### Authentification

| Verbe | URI | Auth requise | Corps JSON |
|:------|:----|:------------:|:-----------|
| `POST` | `/api/user/register` | Non | `{ "email": "...", "password": "...", "fullName": "..." }` |
| `POST` | `/api/user/login` | Non | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/user/logout` | Oui | — |
| `GET` | `/api/me` | Oui | — |

#### Livres

| Verbe | URI | Auth requise | Corps JSON |
|:------|:----|:------------:|:-----------|
| `GET` | `/api/books` | Non | — |
| `GET` | `/api/books/:id` | Non | — |
| `GET` | `/api/books/:id/cover` | Non | — |
| `GET` | `/api/me/books` | Oui | — |
| `POST` | `/api/books` | Oui | `multipart/form-data` : `title`, `year`, `publisher`, `excerpt`, `nbrPage`, `description`, `cover` (fichier), `genreId`, `authorId`, `userId` |
| `PUT` | `/api/books/:id` | Oui | Idem POST |
| `DELETE` | `/api/books/:id` | Oui | — |

#### Avis (Reviews)

| Verbe | URI | Auth requise | Corps JSON |
|:------|:----|:------------:|:-----------|
| `GET` | `/api/books/:book_id/reviews` | Non | — |
| `GET` | `/api/books/:book_id/reviews/:id` | Non | — |
| `POST` | `/api/books/:book_id/reviews` | Oui | `{ "title": "...", "rating": 4, "comment": "..." }` |
| `PUT` | `/api/books/:book_id/reviews/:id` | Oui | `{ "title": "...", "rating": 4, "comment": "..." }` |
| `DELETE` | `/api/books/:book_id/reviews/:id` | Oui | — |

#### Auteurs & Genres

| Verbe | URI | Auth requise | Corps JSON |
|:------|:----|:------------:|:-----------|
| `GET` | `/api/authors` | Non | — |
| `GET` | `/api/authors/:id` | Non | — |
| `POST` | `/api/authors` | Non | `{ "firstname": "...", "lastname": "..." }` |
| `PUT` | `/api/authors/:id` | Non | `{ "firstname": "...", "lastname": "..." }` |
| `DELETE` | `/api/authors/:id` | Non | — |
| `GET` | `/api/genres` | Non | — |

---

### Analyse de la base de données

#### MCD (Modèle Conceptuel de Données)

Le MCD est disponible dans le fichier `doc/MCD.loo` (outil Looping). Voici les entités et associations principales :

```
UTILISATEUR ──< écrit >── BOOKS ──< possède >── GENRE
                 │
                 └──< reçoit >── REVIEWS
                 
AUTHORS ──< écrit par >── BOOKS

UTILISATEUR ──< rédige >── REVIEWS
```

Les relations définies dans les modèles AdonisJS (Lucid) :

| Modèle | Relation | Cible | Clé étrangère |
|:-------|:---------|:------|:--------------|
| `Book` | `belongsTo` | `Genre` | `genre_id` |
| `Book` | `belongsTo` | `Author` | `author_id` |
| `Book` | `belongsTo` | `User` | `user_id` |
| `Book` | `hasMany` | `Review` | — |
| `Review` | `belongsTo` | `User` | `user_id` |
| `Review` | `belongsTo` | `Book` | `book_id` |
| `User` | `hasMany` | `Book` | — |
| `User` | `hasMany` | `Review` | — |

#### MLD (Modèle Logique de Données)

```
users(id, full_name, email, password, created_at, updated_at)
auth_access_tokens(id, tokenable_id → users.id, ...)
genres(id, title)
authors(id, firstname, lastname)
books(id, title, year, publisher, excerpt, nbr_page, description, cover,
      genre_id → genres.id, author_id → authors.id, user_id → users.id,
      created_at, updated_at)
reviews(id, title, rating, comment,
        user_id → users.id, book_id → books.id,
        created_at, updated_at)
```

#### MPD (Modèle Physique de Données)

Les migrations AdonisJS (dossier `backend/database/migrations/`) reflètent exactement ce MPD. Les contraintes de clés étrangères sont définies avec `onDelete('CASCADE')` : la suppression d'un utilisateur supprime ses livres et ses avis ; la suppression d'un livre supprime ses avis.

---

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Navigateur                               │
│                                                                   │
│   ┌─────────────────────────────────────┐                        │
│   │         Frontend – Vue.js 3          │                        │
│   │  (Composition API, Vue Router,       │                        │
│   │   Axios, Pinia)                      │                        │
│   └──────────────┬──────────────────────┘                        │
└──────────────────┼──────────────────────────────────────────────-┘
                   │  Requêtes HTTP (JSON / multipart)
                   │  Bearer Token (OAT) dans les headers
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Backend – AdonisJS 6 (TypeScript)               │
│                                                                   │
│  ┌────────────┐   ┌──────────────┐   ┌────────────────────────┐  │
│  │  Routeur   │──▶│ Middlewares  │──▶│     Contrôleurs        │  │
│  │ /api/...   │   │ (Auth, CORS, │   │ (Books, Reviews,       │  │
│  └────────────┘   │  ForceJSON)  │   │  Auth, Authors, Genre) │  │
│                   └──────────────┘   └────────────┬───────────┘  │
│                                                   │               │
│                                      ┌────────────▼───────────┐  │
│                                      │   Modèles – Lucid ORM  │  │
│                                      │ (Book, Review, User,   │  │
│                                      │  Author, Genre)        │  │
│                                      └────────────┬───────────┘  │
└───────────────────────────────────────────────────┼─────────────-┘
                                                    │  SQL (Knex)
                                                    ▼
                                    ┌───────────────────────────┐
                                    │     Base de données MySQL  │
                                    │  (users, books, reviews,   │
                                    │   authors, genres,         │
                                    │   auth_access_tokens)      │
                                    └───────────────────────────┘
```

---

## Réalisation

### Authentification et gestion des rôles

#### Authentification

L'authentification repose sur les **OAT (Opaque Access Tokens)** fournis par le package `@adonisjs/auth`. Lors de la connexion ou de l'inscription, le backend génère un token opaque unique qui est retourné au client. Ce token doit ensuite être transmis dans le header `Authorization: Bearer <token>` pour toutes les requêtes protégées.

**Flux d'inscription (`POST /api/user/register`) :**
1. Les données (`email`, `password`, `fullName`) sont validées par VineJS.
2. L'email est vérifié comme unique en base de données.
3. Le mot de passe est haché automatiquement via le mixin `withAuthFinder` (algorithme Scrypt).
4. Un token OAT est créé et retourné avec les informations de l'utilisateur.

**Flux de connexion (`POST /api/user/login`) :**
1. Les credentials sont validés par VineJS.
2. `User.verifyCredentials(email, password)` vérifie le hash du mot de passe.
3. Un token OAT est créé et retourné au client.

**Flux de déconnexion (`POST /api/user/logout`) :**
1. Le middleware `auth` vérifie le token Bearer.
2. L'identifiant du token courant est récupéré via `auth.user?.currentAccessToken.identifier`.
3. Le token est supprimé de la table `auth_access_tokens` via `User.accessTokens.delete()`.

Les routes protégées (création/modification/suppression de livres et d'avis, logout, `/me`) sont sécurisées via `.use(middleware.auth())` dans le fichier de routes.

#### Gestion des rôles

> **Fonctionnalité non implémentée.** Dans la version actuelle, il n'existe pas de distinction entre un utilisateur standard et un administrateur. Tous les utilisateurs authentifiés ont les mêmes droits d'écriture. La mise en place d'un système de rôles (ex. : seul le propriétaire d'un livre peut le modifier/supprimer, les admins peuvent tout gérer) constitue une amélioration prioritaire pour la prochaine version.

---

### Sécurité

Plusieurs mesures ont été mises en place pour sécuriser l'application :

**Hachage des mots de passe – Scrypt**
Les mots de passe ne sont jamais stockés en clair. AdonisJS utilise l'algorithme **Scrypt** (via le driver `@adonisjs/core/hash`) avec les paramètres : `cost: 16384`, `blockSize: 8`, `parallelization: 1`. Le champ `password` est marqué `serializeAs: null` dans le modèle User, ce qui garantit qu'il n'est jamais inclus dans les réponses JSON.

**Validation des entrées – VineJS**
Toutes les données reçues par l'API sont validées à l'aide de **VineJS** avant d'être traitées :
- Les emails sont normalisés et leur unicité est vérifiée en base.
- Les mots de passe ont une longueur minimale et maximale.
- Les champs numériques (année, nombre de pages, note) ont des bornes définies.
- Les fichiers de couverture sont limités en taille (67 Mo) et en extensions (`jpg`, `jpeg`, `png`, `webp`).
- Les clés étrangères (`genreId`, `authorId`, `userId`) sont vérifiées comme existantes en base avant insertion.

**CORS restreint**
La configuration CORS (`backend/config/cors.ts`) n'autorise les requêtes cross-origin qu'en provenance de `http://localhost:5173` (l'origine du frontend en développement), limitant ainsi les appels depuis des origines non prévues.

**Tokens OAT révocables**
Contrairement aux JWT, les tokens OAT sont stockés en base de données. Ils peuvent être invalidés immédiatement lors d'un logout, sans attendre une expiration. Cela offre un contrôle précis sur les sessions actives.

**Clés étrangères avec CASCADE**
Les contraintes de clés étrangères avec `onDelete('CASCADE')` garantissent l'intégrité référentielle : la suppression d'un utilisateur ou d'un livre entraîne automatiquement la suppression des données associées, évitant tout enregistrement orphelin.

**Middleware `force_json_response`**
Toutes les réponses de l'API retournent du JSON, empêchant la fuite d'informations via des pages d'erreur HTML non maîtrisées.

---

## Tests

Les tests de l'API ont été réalisés avec **Bruno**, un client HTTP open-source orienté développeur. La collection de tests est versionnée dans le dossier `backend/PassionLectureTestAPI/` et peut être importée directement dans Bruno.

**Couverture des tests :**

| Module | Requêtes testées |
|:-------|:----------------|
| Auth | Register, Login, Logout, Me |
| Books | List, Get, Create, Update, Delete, My Books, Get Cover |
| Authors | List |
| Genres | List |
| Reviews | List, Get, Create, Update, Delete |

Chaque requête est organisée par dossier et utilise une variable d'environnement `baseUrl` (définie dans `environments/Local.bru`) pointant vers `http://localhost:3333`. Les requêtes nécessitant une authentification transmettent le token Bearer en header.

Les tests couvrent les cas nominaux (réponses 200, 201, 204) ainsi que les cas d'erreur courants (ressource introuvable, accès non autorisé). Ils permettent de valider rapidement l'ensemble des endpoints après toute modification du backend.

> **Limite actuelle :** Les tests Bruno sont manuels (pas d'assertions automatiques ni d'intégration CI/CD). La mise en place de tests automatisés avec `@japa/runner` (déjà configuré dans `backend/bin/test.ts`) constitue une évolution naturelle.

---

## Conclusion

### Organisation Git / GitHub

Nous avons suivi une organisation basée sur les **branches par fonctionnalité**. Chaque développeur travaille sur sa propre branche nommée d'après son prénom (`latif`, `david`) ou la fonctionnalité concernée. Les Pull Requests sont ouvertes vers `main` une fois la tâche terminée.

Le premier merge d'une PR se fait généralement sans conflit. Lorsque les deux développeurs terminent leurs tâches en parallèle, des conflits peuvent apparaître lors du second merge : ils sont résolus systématiquement en revue à deux, ce qui garantit que personne n'écrase du travail sans validation mutuelle.

GitHub Projects a servi d'outil de suivi, avec des tickets liés aux commits et PR correspondants pour garder une traçabilité claire.

---

### Conclusion générale

Ce projet nous a permis de passer d'une simulation de backend (json-server) à une vraie API REST structurée avec AdonisJS. La mise en place de l'authentification par tokens, de la validation des données et des relations entre modèles nous a donné une vision complète du développement fullstack. Malgré les fonctionnalités manquantes (rôles, recherche, CRUD complet des avis côté frontend), l'architecture en place constitue une base solide et extensible.

---

### Conclusion personnelle

#### Conclusion de Latif

Ce projet m'a permis de consolider mes connaissances en développement backend avec AdonisJS et de comprendre concrètement le fonctionnement d'une API REST sécurisée. La mise en place de l'authentification par tokens OAT, du hachage des mots de passe et de la validation des données m'a appris énormément sur les bonnes pratiques de sécurité. J'aurais aimé avoir le temps d'implémenter la gestion des rôles et la recherche de livres, qui auraient apporté une véritable valeur ajoutée à l'application. Dans l'ensemble, je suis satisfait du travail accompli et de la progression réalisée.

#### Conclusion de David

J'ai apprécié la cohérence entre le projet frontend réalisé précédemment et ce backend, qui donne enfin du sens à toute l'architecture. Travailler avec AdonisJS et TypeScript en parallèle du frontend Vue.js était parfois source de confusion entre les deux environnements, mais cela m'a aussi forcé à mieux distinguer les responsabilités de chaque couche. Les parties moins stimulantes, comme la rédaction du rapport ou la configuration initiale, restent nécessaires et j'ai appris à les appréhender différemment. Ce projet m'a donné une bonne vision du développement fullstack en conditions réelles.

---

### Critique de la planification

Notre planification a souffert d'un manque de granularité. Les tâches définies en début de projet étaient trop larges (ex. : "Implémenter l'authentification") sans être découpées en sous-tâches précises et estimées. Cela a rendu difficile le suivi de l'avancement réel et a contribué à laisser certaines fonctionnalités non terminées (gestion des rôles, recherche, CRUD complet des avis).

Pour un prochain projet, nous découperions chaque fonctionnalité en tâches atomiques d'une à deux périodes maximum, avec des critères d'acceptation clairs. Cela permettrait au chef de projet d'avoir une vision précise de l'avancement et d'anticiper les retards avant qu'ils ne deviennent bloquants.
