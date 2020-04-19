const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getList = (callback) => {
  connection.query(`select * from savedlist`, (err, data) =>{
    if(err){
      console.log('something went wrong with fetching from list in db')
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}
const postAnime = (anime, callback) => {
  // console.log(anime.mal_id, anime.synopsis, anime.title, anime.title_Japanese, anime.url, anime.type, anime.episodes, anime.rating)
  // console.log(typeof anime.synopsis)
  connection.query(
    `insert into savedlist(title, title_Japanese, url, type, episodes, mal_id, rating) values ('${anime.title}', '${anime.title_Japanese}', '${anime.url}', '${anime.type}', ${anime.episodes}, ${anime.mal_id}, '${anime.rating}');`,(err, data) => {
      if(err){
        console.log('propblem with adding object to mysql table from db')
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
}
const deleteAnime = (id, callback) => {
  connection.query(`delete from savedlist where mal_id = ${id}`,(err, data) => {
    if(err){
      console.log('whoops in deleting a thing from db')
    } else {
      callback(null, data)
    }
  })
}


connection.connect(err => {
  if(err){
    console.log('can\'t connected to myslq yet')
  } else {
    console.log('you\'re connected to your database')
  }
})

module.exports = {getList, postAnime, deleteAnime}