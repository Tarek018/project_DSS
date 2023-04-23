import express from 'express'
const router = express.Router();
import jwt from "jsonwebtoken";
require('dotenv').config()


import bcrypt from "bcrypt";


const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.xml())


import fs from 'fs';
import xml2js from 'xml2js';
import { verifyToken } from '../middleware/adminauth';
const parser = new xml2js.Parser();


router.post('/signup', async(req, res) =>{
    
    const saltRounds =  10;
    const myPlaintextPassword :any = await req.body.user.password[0];
    
    // Génère le hash du mot de passe
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

router.post('/login_user', (req, res) => {
  fs.readFile('./db/user.xml', (err, data) => {
    parser.parseString(data,  (err, result) => {
      
      const user = result.users.user.find((a:any) => a.username[0] === req.body.user );      
      if (user) {
       let valid = bcrypt.compareSync(req.body.pass,user.password[0] ); 
         
        if (!valid) {
          res.status(401).json({ error: "Invalid username or password" });
          return;
        }
        let payload = {
          last_name: user.last_name[0],
          username: user.username[0],
          first_name: user.first_name[0]
        };
        let secret_key :any = process.env.ACCES_SECRET_TOKEN;
        let token = jwt.sign(payload,secret_key)            
        res.status(200).json({token:token}); // send the id of the newly added document in the response
      } else {
        res.status(401).send();
      }
    });
  });
  
})

router.get('/get_my_account', verifyToken , (req:any, res) => {

  res.status(200).json({account:req.user}); 
  

})

router.post('/update_account', verifyToken ,(req:any, res) =>{
  fs.readFile('./db/user.xml', function(err, data) {
    parser.parseString(data, async function(err, result) {
      const users = result.users.user;
      
      const matchingUser = users.find((user:any) => {
        return user.first_name[0] === req.user.first_name && user.last_name[0] === req.user.last_name && user.username[0] === req.user.username;
      });
  
      console.log(req.body);
      
        matchingUser.first_name[0] = req.body.first_name;
        matchingUser.last_name[0] = req.body.last_name;
        matchingUser.username[0] = req.body.username;
        const saltRounds =  10;
        const myPlaintextPassword :any = await req.body.nv_password;
    
        // Génère le hash du mot de passe
        bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
          if (err) {
            console.error(err);
            return;}
            
            matchingUser.password[0] = hash;
            console.log(hash);
            console.log(matchingUser.password[0]);
            
            const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

            fs.writeFile('./db/user.xml', updatedXml, function(err) {
              if (err) throw err;
              let payload:any = {
                "first_name":req.body.first_name,
                "last_name":req.body.first_name,
                "username":req.body.username
              }
              let secret_key :any = process.env.ACCES_SECRET_TOKEN;
              let token = jwt.sign(payload,secret_key)  
              console.log('File updated!');
              res.status(200).json({token:token}); // send the id of the newly added document in the response
      
      
            });
            
          }
        )

  
      
  
      
    });
  });
})



module.exports = router;
