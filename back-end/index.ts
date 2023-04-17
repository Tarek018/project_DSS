import express from 'express'
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

import cors from "cors";
const app = express()
app.use(cors())
app.use(bodyParser.xml())

const port = 3001;

// parse application/xml


app.post('/', async(req, res) => {
  console.log( req.body);
  
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})