const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getSavedList = (userId) => {
  return new Promise((resolve, reject) => {
    const input = [userId];
    const query = `SELECT DISTINCT l.title, l.title_japanese, l.url, l.type, l.mal_id, l.episodes, l.rating FROM savedlist l 
      INNER JOIN users_savedlist us ON (l.mal_id = us.anime_id)
      INNER JOIN users u ON (u.id = us.user_id) WHERE u.id = ? ;`;

    connection.query(query, input, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      };
    });
  });
};

const postAnime = (anime) => {
  return new Promise((resolve, reject) => {
    const { title, title_Japanese, url, type, episodes, mal_id, rating, userId } = anime;
    const input = [ title.trim(), title_Japanese.trim(), url.trim(), type.trim(), episodes, mal_id, rating ];
    const query = `INSERT INTO savedlist(title, title_Japanese, url, type, episodes, mal_id, rating) VALUES (?,?,?,?,?,?,?)`;

    connection.query(query, input, (err, data) => {
      if (err) {
        //if anime already exists in the db, add add new anime-username pair to junction table
        addToJunction(mal_id, userId)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } else {
        resolve(data);
      }
    });
  });
};

const getUser = async (user) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    const input = [user];

    connection.query(query, input, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (username, password) VALUES (?,?)`;
    const input = [username, password];

    connection.query(query, input, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const deleteAnime = (args) => {
  const { mal_id, user_id } = args;
  const query = `DELETE FROM users_savedlist WHERE (anime_id =${mal_id} AND user_id=${user_id}) LIMIT 1;`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      };
    });
  });
};

const addToJunction = (mal_id, userId) => {
  const query = `INSERT INTO users_savedlist (anime_id, user_id) VALUES (?,?)`;
  const input = [mal_id, userId];

  return new Promise((resolve, reject) => {
    connection.query(query, input, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      };
    });
  });
};

connection.connect((err) => {
  if (err) {
    console.log("can't connected to myslq");
  } else {
    console.log("you're connected to your database");
  };
});

module.exports = {
  getSavedList,
  postAnime,
  deleteAnime,
  getUser,
  addUser,
  addToJunction,
};
