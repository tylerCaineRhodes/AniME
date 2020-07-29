const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();
const cors = require('cors');
const { getList, postAnime, deleteAnime } = require('./db/queries.js');

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`you're officially listening to your お母さん at port ${port}`);
});

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
