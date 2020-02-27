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
  id int not null primary key, 
  synopsis text,
  title text, 
  title_Japanese VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
  url text,
  type text, 
  episodes smallint,
  rating text
);

insert into savedList (id, synopsis, title, title_japanese, url, type, episodes, rating) values (4, 'this is a cool anime about grape soda', 'high school magic project now','魔法の高校プロジェクトNOW!', 'https://images.alphacoders.com/205/205913.jpg','anime', 5, 'pg-13');

select * from savedList;