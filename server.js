const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();
const cors = require('cors');

app.use(cors());
// app.use(express.static(path.join(__dirname,)))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`you're officially listening to your mom at port ${port}`);
})