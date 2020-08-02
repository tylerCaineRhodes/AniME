const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const {
  getList,
  postAnime,
  deleteAnime,
  getUser,
  addUser,
  addToJunction,
} = require('./db/queries.js');

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`you're officially listening to your お母さん at port ${port}`);
});

app.post('/signin', (req, res) => {
  //get user info 
  const {username, password} = req.body;
  getUser(username)
  .then((data) => {
    //compare password that was returned with input password -  bcrypt
    const userPassword = data[0].password;
    const passwordIsMatch = bcrypt.compareSync( password, userPassword );
    //if they match, done
    if(passwordIsMatch){
      console.log('passwords match and should lg in from here')
      res.send(data)
    } else {
      res.status(500).send('incorrect password')
    }
  })
  .catch(err => {
    res.status(500).send('failed to find username')
  })
});

app.post('/register', async(req, res) => {
  const { username, password } = req.body;
  try {
    var hashed = await bcrypt.hash(password, 10);
    
  } catch {
    res.sendStatus(518)
  }
  //check to see if username already exists
  getUser( username )
    .then((data) => { 
      if(data.length === 0){
        addUser(username, hashed)
        //here, do a thing to redirect to login
          .then((data) => console.log(data, '<-- data after posting new user to db'))
          .catch((err) => {
            res.status(518).send(err)
          })
      } else {
        res.status(500).send('username already taken')
      }
    })
    .catch((err) => {
      res.status(500).send('error in calling getUser', err)
    })
})

app.post('/addToJunction', (req, res) => {
  const { mal_id, userId } = req.body;

  addToJunction(mal_id, userId)
    .then((data) => {
      console.log(data, '< data from call');
      res.send(data);
    })
    .catch((err) => {
      res.status(518).send(err);
    });
});

app.get('/getUserList/:userId', (req, res) => {
  getList(req.params.userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(518).send(err);
    });
});

app.post('/postNewItem', (req, res) => {
  postAnime(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete('/deleteAnime', (req, res) => {
  deleteAnime(req.query.uniqueId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
