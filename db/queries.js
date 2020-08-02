const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getList = () => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from savedlist`, (err, data) => {
      if (err) {
        console.log('something went wrong with fetching from list in db');
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const postAnime = (anime) => {
  return new Promise((resolve, reject) => {
    const {title, title_Japanese, url, type, episodes, mal_id, rating} = anime;
    const query = `insert into savedlist(title, title_Japanese, url, type, episodes, mal_id, rating) values (?,?,?,?,?,?,?)`;
    const input = [ title.trim(), title_Japanese.trim(), url.trim(), type.trim(), episodes, mal_id, rating ];

    connection.query(query, input, (err, data) => {
        if (err) {
          console.log('problem with adding object to mysql table from db');
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getUser = async(user) => {
  console.log(user, '<-- username')
  return new Promise((resolve, reject) => {
    const query = `select * from users where username = ?`
    const input = [user];

    connection.query(query, input, (err, data) => {
      if(err){
        console.log('err from query')
        reject(err)
      } else {
        console.log(data, '<--- data from query')
        resolve(data)
      }
    })
  })
}

const addUser = async(username, password) => {
  return new Promise((resolve, reject) => {
    const query = `insert into users (username, password) values (?,?)`
    const input = [username, password];

    connection.query(query, input, (err, data) => {
      if(err){
        console.log('err from query')
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const deleteAnime = (id) => {
  const query = `delete from savedlist where mal_id = ?`;
  const input = [id];

  return new Promise((resolve, reject) => {
    connection.query(query, input, (err, data) => {
        if (err) {
          console.log('whoops in deleting a thing from db');
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

connection.connect((err) => {
  if (err) {
    console.log("can't connected to myslq");
  } else {
    console.log("you're connected to your database");
  }
});

module.exports = { getList, postAnime, deleteAnime, getUser, addUser };
