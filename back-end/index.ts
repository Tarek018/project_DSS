import express from 'express'
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

import cors from "cors";
const app = express()
app.use(cors())

// parse application/xml
app.use(bodyParser.xml())

const port = 3001;

//routes
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');
const adminRouteid = require('./routes/validate_id');




app.use('/',usersRoute);
app.use('/',adminRoute);
app.use('/admin',adminRouteid);









app.post('/', async(req, res) => {
  console.log( req.body);
  
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})