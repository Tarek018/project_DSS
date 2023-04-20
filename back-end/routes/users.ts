import express from 'express'
const router = express.Router();

import bcrypt from "bcrypt";


const bodyParser = require('body-parser');

router.use(bodyParser.xml())


const SaxonJS = require('saxon-js');
const fs = require('fs');

const xmlFile = './db/user.xml'// Chemin vers le fichier XML

const xml = fs.readFileSync(xmlFile, 'utf8'); // Charge le contenu du fichier XML

const query = `
  doc("${xmlFile}")/*
`; // Votre requête XQuery
router.post('/signup', async(req, res) =>{
    
    const saltRounds =  10;
    const myPlaintextPassword :any = await req.body.user.password[0];
    
    // Génère le hash du mot de passe
    bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Hash:', hash);
    });

    SaxonJS.execute({
        xpathDefaultNamespace: 'http://www.w3.org/2005/xpath-functions',
        destination: 'serialized',
        selection: query,
       
      }).then((result:any) => {
        console.log(result);
      }).catch((error :any)=> {
        console.error(error);
      }) as Function;
      
    

})






module.exports = router;
