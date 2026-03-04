<div align="center">
    <h1>PassionLecture_294<h1/>
    <img src="./img/grok-image-54d9db9c-9e3f-437b-ae2b-c63a362f0ea2.png" height="400">
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

## Table des Matières
1. [Introduction](#introduction)
2. [Analyse](#analyse)
3. [Reéalisation](#réalisation)
4. [Conclusion](#conclusion)

## Introduction

Nous devons faire un site qui s'intitule : Passion Lecture. C'est un site qui permet de poster des ouvrages de tout type pour que les gens puissent les noter et mettre des commentaires. il est possible d'ajouter un ouvrage, le modifier et le supprimer. Le site est codé en Vue.js avec une simulation de backend en utilisant json-server.

## Analyse

### Maquettes

### Planification des tâches

### Structure du code

### Analyse des routes

| **Nom** | **Verbe HTTP** | **URL** | **Envoyer du JSON** |
| :--- | :--- | :--- | :--- |
| **Récuperer tout les livres** | ```GET``` | ```/api/books``` | ```NON``` |
| **Modifier un livre** | ```PUT``` | ```/api/books/:id``` | ```OUI``` |
| **Ajouter un livre** | ```POST``` | ```/api/books``` | ```OUI``` |
| **Supprimer un livre** | ```DELETE``` | ```/api/books/:id``` | ```NON``` |
| **Voir les details d'un livre** | ```GET``` | ```/api/books/:id``` | ```NON``` |
| **Ajouter un avis** | ```POST``` | ```/api/books/:id/reviews``` | ```OUI``` |
| **Modifier un avis** | ```PUT``` | ```/api/books/:id/reviews``` | ```OUI``` |
| **Ajouter un auteur** | ```POST``` | ```/api/authors``` | ```OUI``` |
| **Voir les auteurs** | ```GET``` | ```/api/authors``` | ```NON``` |
| **Supprimer un auteur** | ```DELETE``` | ```/api/authors/:id``` | ```NON``` |

## Réalisation

### Fonctionnalités

### Git

Pour optimiser notre organisation sur Git, nous nous coordonnons d'abord sur la répartition des tâches. Chacun travaille ensuite sur sa propre branche afin d'éviter tout conflit lors des commits intermédiaires.

Lorsqu'un de nous termine sa tâche, il ouvre une Pull Request pour fusionner son code (le premier merge se fait normalement sans problème). En revanche, lorsque l'autre termine, des conflits peuvent apparaître : dans ce cas, nous effectuons une revue à deux pour analyser et résoudre les conflits ensemble avant de valider la fusion.

## Conclusion

### Conclusion générale

### Conclusion personnelle

#### Latif
#### David

### Critique de la planification