# Readme avec documentation sur mon travail

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

Crée une nouvelle tâche

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

Crée une nouvelle tâche

```json
// Response
{
    "message": "Tag deleted"
}
```
