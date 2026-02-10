# PassionLecture_294



## Analyse des routes

| **Nom** | **Verbe HTTP** | **URL** | **Envoyer du JSON** |
| :--- | :--- | :--- | :--- |
| **Récuperer tout les livres** | ```GET``` | ```/api/books``` | ```NON``` |
| **Modifier un livre** | ```PUT``` | ```/api/books/:id/edit``` | ```OUI``` |
| **Ajouter un livre** | ```POST``` | ```/api/books/add``` | ```OUI``` |
| **Supprimer un livre** | ```DELETE``` | ```/api/books/:id/delete``` | ```NON``` |
| **Voir les details d'un livre** | ```GET``` | ```/api/books/:id/details``` | ```NON``` |
| **Ajouter un avis** | ```POST``` | ```/api/books/:id``` | ```OUI``` |
| **Modifier un avis** | ```PUT``` | ```/api/books/:id``` | ```OUI``` |