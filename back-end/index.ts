import express from 'express'
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);


const app = express()
app.use(bodyParser.xml())

const port = 3001;

// parse application/xml


app.post('/', (req, res) => {
  console.log(req.body.film);
  
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})