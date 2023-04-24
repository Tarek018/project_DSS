import express from 'express';
const router = express.Router();
import jwt from "jsonwebtoken";
import webpush from 'web-push';



const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.xml());

import fs from 'fs';
import xml2js from 'xml2js';
const parser = new xml2js.Parser();

import { verifyToken } from "../middleware/adminauth";

router.get('/verify_token',(req, res) => {
  
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  let secret_key:any = process.env.ACCES_SECRET_TOKEN;
  jwt.verify(token.split(' ')[1], secret_key, (err:any, decoded:any) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
  })
  res.status(200);

})


router.post('/login', async(req, res) => {
  
  fs.readFile('./db/admin.xml', (err, data) => {
    parser.parseString(data,  (err, result) => {
      
      const admin = result.admins.admin.find((a:any) => a.password[0] === req.body.password );      
      if (admin) {
        let payload:any = {
          "id":admin.id[0],
        }
        let secret_key :any = process.env.ACCES_SECRET_TOKEN;
        let token = jwt.sign(payload,secret_key)            
        res.status(200).json({token:token}); // send the id of the newly added document in the response
      } else {
        res.status(401).send();
      }
    });
  });

})

router.post('/add_film',async (req, res) => {
  fs.readFile('./db/films.xml', 'utf-8', (err, data) => {
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
       result.films.film.push({
         title: req.body.film.title[0],
         the_screening_date: req.body.film.date[0],
         the_projection_room: req.body.film.room[0],
       });
   
       // convert JSON object back to XML data
       const builder = new xml2js.Builder();
       const xml = builder.buildObject(result);
   
       // write the updated XML data to file
       fs.writeFile('./db/films.xml', xml, (err) => {
         if (err) {
           console.log(err);
           return;
         }
         
       });
     });
   });

   // Read the XML file
const xmlData = fs.readFileSync('./db/subscription.xml', 'utf-8');

// Parse the XML data
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  // Extract the subscription nodes
  const subscriptions = result.subscriptions.subscription;
  webpush.setVapidDetails(
    'mailto:tarek22042002triki@gmail.com',
    'BCr32pvQucsO1jY9Po4o_xQ3I6v_VcPYFwswJnO_xgLvgH0M8kW25wviJInf5D-RJR6V4QnOomdoEsLXdX90BNE',
    'fyYzNvyoXu1xrrpHhDHd4AtbsF-R-IcquIVIqvczNdM'
  )
  //The notification content
  const payload = JSON.stringify({ title: 'in the date '+req.body.film.date[0]+' there is a movie in room '+req.body.film.room[0]+' under the title of'+req.body.film.title[0] });

  // Iterate over the subscriptions and send a push notification to each one
  for (const subscription of subscriptions) {
    webpush.sendNotification(subscription,payload)
      .then(() => console.log('Push notification sent successfully'))
      .catch((err) => console.error('Error sending push notification:', err));
  }
});
   
})

router.get('/get_all_film' ,verifyToken,(req, res) => {

  fs.readFile('./db/films.xml', (err, data) => {
    parser.parseString(data, (err, result) => {
      res.set('Content-Type', 'text/xml');
      res.send(new xml2js.Builder().buildObject(result));
    });
  });

})












module.exports = router;
