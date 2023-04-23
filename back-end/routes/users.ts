import express from 'express'
const router = express.Router();
import jwt from "jsonwebtoken";
require('dotenv').config()


import bcrypt from "bcrypt";


const bodyParser = require('body-parser');

router.use(bodyParser.xml())


import fs from 'fs';
import xml2js from 'xml2js';


router.post('/signup', async(req, res) =>{
    
    const saltRounds =  10;
    const myPlaintextPassword :any = await req.body.user.password[0];
    
    // Génère le hash du mot de passe
    let hashedpass:any;
    bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }
      req.body.user.password[0]=hash;
      fs.readFile('./db/user.xml', 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
      
        // convert XML data to JSON object
        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          // add new user element to JSON object
          result.users.user.push({
            first_name: req.body.user.first_name[0],
            last_name: req.body.user.last_name[0],
            username: req.body.user.username[0],
            password: req.body.user.password[0]
          });
      
          // convert JSON object back to XML data
          const builder = new xml2js.Builder();
          const xml = builder.buildObject(result);
      
          // write the updated XML data to file
          fs.writeFile('./db/user.xml', xml, (err) => {
            if (err) {
              console.log(err);
              return;
            }
              let payload:any = {
              "first_name":req.body.user.first_name[0],
              "last_name":req.body.user.last_name[0]
            }
            let secret_key :any = process.env.ACCES_SECRET_TOKEN;
            let token = jwt.sign(payload,secret_key)            
            res.status(200).json({token:token}); // send the id of the newly added document in the response
          });
        });
      });
    });

    

})






module.exports = router;
