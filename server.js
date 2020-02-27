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