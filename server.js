const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const { getList, postAnime, deleteAnime, getUser } = require('./db/queries.js');

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`you're officially listening to your お母さん at port ${port}`);
});

app.post('/signin', (req, res) => {
  //get user info 
  getUser(req.body.username)
  .then((data) => {
    //compare password that was returned with input password -  bcrypt
    const userPassword = data[0].password;
    const passwordIsMatch = bcrypt.compareSync(password, userPassword);
    //if they match, done
    if(passwordIsMatch){
      res.send(data)
    } else {
      res.send(500).send('incorrect password')
    }
    res.status(201).send(data)
  })
  .catch(err => {
    console.log('from server')
    res.status(500).send(err)
  })

  //check and see if the user exists in the db
  //if they don't, send err
  //if they do, hash password
  //get user password and compare it to hash,
  //if they don't match, send error that password was wrong
  //if they do, send 201, along with user info
});

app.post('/register', async(req, res) => {
  const { username, password } = req.body;
  try {
    var hashed = await bcrypt.hash(password, 10);
    
  } catch {
    res.sendStatus(518)
  }

  //check to see if username already exists
  //if it does, send 'taken
  //else, hash password and insert into db. then, send response
})

app.get('/getUserList', (req, res) => {
  getList()
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
