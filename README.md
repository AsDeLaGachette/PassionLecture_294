# PassionLecture_294



## Analyse des routes

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