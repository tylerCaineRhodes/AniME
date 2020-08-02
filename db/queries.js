const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getList = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `select l.title, l.title_japanese, l.url, l.type, l.mal_id, l.episodes, l.rating from savedlist l inner join users_savedlist us on (l.mal_id = us.anime_id) inner join users u on (u.id = us.user_id) where u.id = ${userId};`;

    connection.query(query, (err, data) => {
      if (err) {
        console.log('something went wrong with fetching from list in db', err);
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

const deleteAnime = (args) => {
  const { mal_id, user_id } = args;
  const query = `delete from users_savedlist where (anime_id =${mal_id} and user_id=${user_id});`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, data) => {
        if (err) {
          console.log('whoops in deleting a row from junction table');
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const addToJunction = (mal_id, userId) => {
  const query = `insert into users_savedlist (anime_id, user_id) values (?,?)`;
  const input = [mal_id, userId];

  return new Promise((resolve, reject) => {
    connection.query(query, input, (err, data) => {
        if (err) {
          console.log('whoops in posting a thing into junction table');
          reject(err);
        } else {
          console.log('data from users_savedlist pass')
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

module.exports = { getList, postAnime, deleteAnime, getUser, addUser, addToJunction };
