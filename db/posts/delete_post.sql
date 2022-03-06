DELETE FROM posts
WHERE post_id = $1;

DELETE FROM comments
WHERE destination_id = $1;

SELECT * FROM posts