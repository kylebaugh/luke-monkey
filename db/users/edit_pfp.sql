UPDATE users
SET profile_picture = $2
WHERE user_id = $1;

UPDATE users
SET profile_banner = $3
WHERE user_id = $1;
