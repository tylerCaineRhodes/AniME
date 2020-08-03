DROP DATABASE IF EXISTS anime;

CREATE DATABASE anime;

USE anime;

CREATE TABLE savedlist (
  title TEXT, 
  title_Japanese VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
  url TEXT,
  type TEXT, 
  mal_id INT PRIMARY KEY,
  episodes INT,
  rating TEXT
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  username TEXT,
  password VARCHAR(255)
);

CREATE TABLE users_savedlist (
  anime_id INT,
  user_id INT,
  FOREIGN KEY (anime_id) REFERENCES savedlist(mal_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO savedlist (title, title_japanese, url, type, mal_id, episodes, rating) VALUES ('MagicHighskewlProject','魔法の高校プロジェクトNOW!', 'https://www.allthingsdogs.com/wp-content/uploads/2020/02/Dog-Sneezing-Feature.jpg','anime',3,  5, 'pg-13');
INSERT INTO savedlist (title, title_japanese, url, type, mal_id, episodes, rating) VALUES ('Hair Man','髪の男', 'https://watchmojo.com/uploads/blipthumbs/VG-RP-Top10-Absurd-VideoGame-Hairstyles-720p30_480.jpg','hair', 666,  5, "hairded hair hair");

INSERT INTO users (username, password) VALUES ('Tyler', 'Password');
INSERT INTO users (username, password) VALUES ('notTyler', 'Passwordagain');

INSERT INTO users_savedlist (anime_id, user_id) VALUES (3, 1);
INSERT INTO users_savedlist (anime_id, user_id) VALUES (666, 1);

SELECT * FROM savedList;