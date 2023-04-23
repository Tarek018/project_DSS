import express from 'express';
const router = express.Router();

import fs from 'fs';
import xml2js from 'xml2js';
const parser = new xml2js.Parser();

router.post('/:id',async (req ,res) => {


  fs.readFile('./db/admin.xml', (err, data) => {
    parser.parseString(data,  (err, result) => {
      
      const admin = result.admins.admin.find((a:any) => a.id[0] === req.params.id);      
      if (admin) {
        res.status(200).send('Admin with id ' + req.params.id + ' exists');
      } else {
        res.status(401).send('Admin with id ' + req.params.id + ' does not exist');
      }
    });
  });
  

})


module.exports = router;
