//server.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const uuidv4 =require('uuidv4');
//import { Router } from 'express';
const nodemailer = require('nodemailer');
const imagesToPdf = require("images-to-pdf")
var fs = require('fs');

let app = express();


const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

async function ConvertToPdf (){
  const file = './PdfFiles/'+uuidv4()+'.pdf';
  const file='pss.pdf';
  let result= await imagesToPdf(["notfound.png"], file)
  if(result)
  {
    let TemplateData;
    // create reusable transporter object using the default SMTP transport
  fs.readFile('Config.json', (err, data) => {
    if (err) throw err;
    TemplateData= JSON.parse(data);
    main(file,TemplateData);
  });
  
  }  
 
}

async function main(pdfPath, TemplateData) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();


 // let transporter = nodemailer.createTransport({
   //   host: 'smtp.ethereal.email',
    //  port: 587,
     // secure: false, // true for 465, false for other ports
      //auth: {
       //   user: testAccount.user, // generated ethereal user
        //  pass: testAccount.pass // generated ethereal password
     // }
  //});

   let transporter = nodemailer.createTransport({
     service: 'gmail',
      // true for 465, false for other ports
      auth: {
          user: TemplateData.SmtpCredentials.user, // generated ethereal user
          pass: TemplateData.SmtpCredentials.pass // generated ethereal password
     }
  });


 // {
   // filename: 'image.png',
    //content: Buffer.from(
      //  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
        //    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
          //  'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        //'base64'
    //) 
  //},

  // send mail with defined transport object
  let info = await transporter.sendMail({
      from: TemplateData.SmtpCredentials.user, // sender address
      to: 'muhammad.ahmedraza@basecampdata.com,ahmed.zubair@basecampdata.com', // list of receivers
      subject: 'Image ?', // Subject line
      text: 'Cam Image', // plain text body
      html: '<b>Hey Cam Image?</b>', // html body,
      attachments: [  
      {
      
        filename: pdfPath,
        path: pdfPath
      }
      ]
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

app.use(express.static(path.join(__dirname, '../../../build')));

app.get('/', (req, res)=> {
  res.send('Express server is up and running.');
})

//GET request to server
app.get('/api', (req, res)=> {
  res.send('Express server is up and runninssg.');
});
app.get('/api/cc', (req, res)=> {
  res.send('Express server is up and runninssg.');
});


//POST request to server
app.post('/api', (req, res)=> {
  console.log(req.body);
  //ConvertToPdf ();
  console.log("Yes Got it");
})
app.post('/api/Image', (req, res)=> {
  console.log(req.body);
  ConvertToPdf ();
  console.log("Yes Got it");
})

//DELETE request to server
app.delete('/api', (req, res)=> {
  
})

//PUT request to server
app.put('/api', (req, res)=> {
  
});

app.get('*', (req, res) => {
 // res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
});

app.listen(port, _=> console.log(`The server is listening on port ${port}`));