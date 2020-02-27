const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'anime'
});


connection.connect(err => {
  if(err){
    console.log('can\'t connected to myslq yet')
  } else {
    console.log('you\'re connected to your database')
  }
})