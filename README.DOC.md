# Readme avec documentation sur mon travail

## TODOS

#### PUT /api/todos/:todoId/tags/:tagId

Crée une nouvelle tâche

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

## TAGS

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
