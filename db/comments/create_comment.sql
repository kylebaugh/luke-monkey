INSERT INTO comments (body, destination_id, author_id)
VALUES ($1, $2, $3)
RETURNING *;