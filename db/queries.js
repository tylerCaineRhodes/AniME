const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anime'
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
  connection.query(
    `insert into savedlist (id, synopsis, title, title_japanese, url, type, episodes, rating) values 
    (
      ${anime.mal_id}, 
      '${anime.synopsis}', 
      '${anime.title}', 
      '${anime.title_Japanese}', 
      '${anime.url}', 
      '${anime.type}', 
      ${anime.episodes}, 
      '${anime.rating}' 
      )`, (err, data) => {
        if(err){
          console.log('propblem with adding object to mysql table from db')
          callback(err, null)
        } else {
          callback(null, data)
        }
      })
  // 'title':response.data['title'], 
  // 'title_Japanese':response.data['title_japanese'], 
  // 'url':response.data['image_url'], 
  // 'type':response.data['type'], 
  // 'episodes':response.data['episodes'], 
  // 'rating':response.data['rating']
}

connection.connect(err => {
  if(err){
    console.log('can\'t connected to myslq yet')
  } else {
    console.log('you\'re connected to your database')
  }
})

module.exports = {getList, postAnime}