-- animeObj = {
--   'synopsis': response.data['synopsis'], 
--   'title': response.data['title'], 
--   'title_Japanese': response.data['title_japanese'], 
--   'url': response.data['image_url'], 
--   'type': response.data['type'], 
--   'mal_id':response.data['mal_id'], 
--   'episodes':response.data['episodes'], 
--   'rating':response.data['rating']
-- } 

drop database if exists anime;

create database anime;

use anime;

CREATE TABLE savedlist (
  id int auto_increment primary key, 
  title text, 
  title_Japanese VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
  url text,
  type text, 
  mal_id int,
  episodes int,
  rating text
);

CREATE TABLE users (
  id int auto_increment primary key, 
  name text,
  password varchar(255)
);


CREATE TABLE users_savedlist (
  anime_id int,
  user_id int,
  FOREIGN KEY (anime_id) REFERENCES savedlist(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

insert into savedList (title, title_japanese, url, type, mal_id, episodes, rating) values ('MagicHighskewlProject','魔法の高校プロジェクトNOW!', 'https://www.allthingsdogs.com/wp-content/uploads/2020/02/Dog-Sneezing-Feature.jpg','anime',3,  5, 'pg-13');
insert into savedList (title, title_japanese, url, type, mal_id, episodes, rating) values ('Hair Man','髪の男', 'https://watchmojo.com/uploads/blipthumbs/VG-RP-Top10-Absurd-VideoGame-Hairstyles-720p30_480.jpg','hair', 666,  5, "hairded hair hair");

insert into users (name, password) values ('Tyler', 'password');
insert into users (name, password) values ('notTyler', 'passwordagain');

insert into users_savedlist (anime_id, user_id) values (1, 1);
insert into users_savedlist (anime_id, user_id) values (2, 1);

select * from savedList;