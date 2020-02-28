const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();
const cors = require('cors');
const db = require('./db/queries.js');

app.use(cors());
// app.use(express.static(path.join(__dirname,)))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`you're officially listening to your mom at port ${port}`);
})

app.get('/getUserList', (req, res) => {
  db.getList((err, data) => {
    if(err){
      console.log('problem in fetching list from server')
    }else{
      res.send(data)
    }
  })
})

app.post('/postNewItem', (req, res) => {
  console.log('here are the params -->', req.body)
  db.postAnime(req.body, (err, data) => {
    if(err){
      console.log('problem with posting to table in mysql in server')
    } else {
      res.send(data)
    }
  })
})

app.delete('/deleteAnime', (req, res) => {
  console.log(req.query.uniqueId)
  db.deleteAnime(req.query.uniqueId, (err, data) => {
    if(err){
      console.log('nah did not delete from db in server')
    } else {
      console.log('succesfully deleted the thing')
      res.end();
    }
  })
})