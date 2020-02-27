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

connection.connect(err => {
  if(err){
    console.log('can\'t connected to myslq yet')
  } else {
    console.log('you\'re connected to your database')
  }
})

module.exports = {getList}