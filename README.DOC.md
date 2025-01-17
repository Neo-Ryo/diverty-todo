# Readme avec documentation sur mon travail

## Installation

Suivre la meme routine d'installation que sur le README.md

## Models backend

-   Creation du model Tag `./backend/models/Tag.js`
-   Modification du model Todo avec l'ajout de la relation avec le model Tag

## Les routes ajoutees au backend

### TODOS

#### PUT /api/todos/:todoId/tags/:tagId

Pour assigner ou retirer un tag a une tache

```json
// Response
{
    "_id": "64b91d841aa2d933285b5670",
    "title": "Acheter du lait",
    "completed": false,
    "position": 1,
    "tags": [
        {
            "_id": "6786a00c4817377e5c2e78c7",
            "name": "Courses",
            "color": "#e01b24"
        }
    ]
}
```

#### GET /api/todos/search/filter

Filtre les todos en fonction des query

ex: `/api/todos/search/filter?completed=true&tag=un-id-de-tag&title=toto`

Les query `completed`, `title` et `tag` ne sont pas obligatoire

```json
// Response
[
    {
        "_id": "64b91d841aa2d933285b5670",
        "title": "Acheter du lait",
        "completed": false,
        "position": 1,
        "tags": [
            {
                "_id": "6786a00c4817377e5c2e78c7",
                "name": "Courses",
                "color": "#e01b24"
            }
        ]
    }
]
```

### TAGS

#### GET /api/tags

Retourne tous les tags

```json
[
    {
        "_id": "6786a00c4817377e5c2e78c7",
        "name": "Back",
        "color": "#e01b24"
    }
]
```

#### POST /api/tags

Crée un tag

```json
// Request
{
  "name": "New tag",
  "color": "#e01b24"
}

// Response
{
  "_id": "6786a00c4817377e5c2e78c7",
  "name": "New tag",
  "color": "#e01b24",
}
```

#### DELETE /api/tags/:id

Supprime un tag

```json
// Response
{
    "message": "Tag deleted"
}
```

## Cote front

J'ai tres simplement organiser le dossier `components` par composants et j'ai creer un store simple pour pouvoir
gerer certains `states` de manieres global.

### Autres

la ligne commentee dans `./frontend/vue,config.js` m'a permis de travailler en dev localement (a moins que je n'ai rate une instruction).
Pour toutes autres informations n'hesitez pas a me contacter.
