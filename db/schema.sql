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

create table savedlist (
  id int auto_increment primary key, 
  title text, 
  title_Japanese VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
  url text,
  type text, 
  mal_id int,
  episodes int,
  rating text
);

insert into savedList (title, title_japanese, url, type, mal_id, episodes, rating) values ('high school magic project now','魔法の高校プロジェクトNOW!', 'https://images.alphacoders.com/205/205913.jpg','anime',3,  5, 'pg-13');

select * from savedList;