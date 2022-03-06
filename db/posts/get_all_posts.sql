SELECT p.*, u.username, u.profile_picture FROM posts p
JOIN users u ON u.user_id = p.author_id;
