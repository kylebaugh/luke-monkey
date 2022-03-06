CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_picture TEXT NOT NULL,
    profile_banner TEXT NOT NULL
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    img_link TEXT NOT NULL,
    author_id INT REFERENCES users (user_id),
    likes INT
)
CREATE TABLE comments {
    comment_id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    destination_id INT REFERENCES posts(post_id),
    author_id INT REFERENCES users (user_id),
    author_username varchar(999999),
    likes INT 
}