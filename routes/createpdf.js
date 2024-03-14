var express = require('express');
var router = express.Router();
var pdf = require('html-pdf');
var path = require('path');
const session = require('express-session');
const fs = require('fs');


//Middleware
const VerifyLogin = function (req, res, next) {
  if (req.session.loggedIn) {
    next()
  }
  else {
    res.redirect("/");
  }
}


// GET request handler
router.get('/', VerifyLogin, function (req, res, next) {
  let user = req.session.user;
  res.render('createpdf/generatepdf', { title: 'Generate Resume', create: true, activeNav: 'create', user });
});

// POST request handler
router.post('/generatepdf', function (req, res, next) {
  console.log(req.body);
  console.log(req.body['education[]']);


  const education = req.body['education[]'];
  const skills = req.body['skills[]'];
  const passion = req.body['passion[]'];
  const hobbies = req.body['hobbies[]'];
  const experience = req.body['experience[]'];
  const education_description = req.body['education_description[]'];
  const experience_description = req.body['experience_description[]'];


  console.log("check: ", education)
  console.log(education.length);
  var educationHtml = '';
  var educationdescriptionHtml = '';
  for (let i = 0; i < education.length; i++) {
    const educationItem = education[i];
    const education_descriptionItem = education_description[i];
    educationHtml += `<p> ${i + 1}: ${educationItem}</p> <p class="parag">${education_descriptionItem}</p>`;
  }

  var skillsHtml = '';
  for (let i = 0; i < skills.length; i++) {
    const skillsItem = skills[i];
    skillsHtml += `<p> ${i + 1}: ${skillsItem}</p>`;
  }

  var passionHtml = '';
  for (let i = 0; i < passion.length; i++) {
    const passionItem = passion[i];
    passionHtml += `<p> ${i + 1}: ${passionItem}</p>`;
  }

  var hobbiesHtml = '';
  for (let i = 0; i < hobbies.length; i++) {
    const hobbiesItem = hobbies[i];
    hobbiesHtml += `<p> ${i + 1}: ${hobbiesItem}</p>`;
  }

  var experienceHtml = '';
  var experiencedescriptionHtml = '';
  for (let i = 0; i < experience.length; i++) {
    const experienceItem = experience[i];
    const experience_descriptionItem = experience_description[i];
    experienceHtml += `<p> ${i + 1}: ${experienceItem}</p><p class="parag"> ${experience_descriptionItem}</p>`;
  }

  // Example HTML content for the PDF
  const image = req.files.Image;
  const imagePath = './public/rezume-images/' + req.body.name;

  image.mv(imagePath, async function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error moving image');
      return;
    }
    var htmlContent = await `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
     
  
      <style>
      * {
      box-sizing: border-box;
    }
    
    body {
      margin: 2.2rem;
      padding: 50px;
    }
    
    div#resume {
      min-width: 310px;
      font: 16px Helvetica, Avernir, sans-serif;
      line-height: 24px;
      color: #000;
    }
    
    div#resume h1 {
      margin: 0 0 16px 0;
      padding: 0 0 16px 0;
      font-size: 70px;
      font-weight: bold;
      letter-spacing: -2px;
      border-bottom: 1px solid #999;
      line-height: 50px;
    }
    
    div#resume h2 {
      font-size: 35px;
      margin: 0 0 6px 0;
      position: relative;
    }
    
    div#resume h2 span {
      position: absolute;
      bottom: 0;
      right: 0;
      font-style: italic;
      font-family: Georgia, serif;
      font-size: 22px;
      color: #999;
      font-weight: normal;
    }

    .parag{
      font-size: 13px; 
      font-weight: lighter;
      word-spacing: 3px;
    }
    
    div#resume p {
      margin: 0 0 16px 0;
      font-size: 19px;
    }
    
    div#resume a {
      color: #999;
      text-decoration: none;
      border-bottom: 1px dotted #999;
    }
    
    div#resume a:hover {
      border-bottom-style: solid;
      color: #000;
    }
    
    div#resume p.objective {
      font-family: Georgia, serif;
      font-style: italic;
      color: #666;
    }
    
    div#resume dt {
      font-style: italic;
      font-weight: bold;
      font-size: 18px;
      text-align: right;
      padding: 0 26px 0 0;
      width: 150px;
      border-right: 1px solid #999;
    }
    
    div#resume dl {
      display: table-row;
    }
    
    div#resume dl dt,
    div#resume dl dd {
      display: table-cell;
      padding-bottom: 20px;
    }
    
    div#resume dl dd {
      width: 500px;
      padding-left: 26px;
    }
    
    div#resume img {
      float: right;
      padding: 10px;
      background: #fff;
      margin: 0 30px;
      transform: rotate(-4deg);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      width: 30%;
      max-width: 220px;
    }
    
    @media screen and (max-width: 1100px) {
      div#resume h2 span {
        position: static;
        display: block;
        margin-top: 2px;
      }
    }
    
    @media screen and (max-width: 550px) {
      body {
        margin: 1rem;
      }
      div#resume img {
        transform: rotate(0deg);
      }
    }
    
    @media screen and (max-width: 400px) {
      div#resume dl dt {
        border-right: none;
        border-bottom: 1px solid #999;
      }
      div#resume dl,
      div#resume dl dd,
      div#resume dl dt {
        display: block;
        padding-left: 0;
        margin-left: 0;
        padding-bottom: 0;
        text-align: left;
        width: 100%;
      }
      div#resume dl dd {
        margin-top: 6px;
      }
      div#resume h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
      }
      div#resume dt {
        font-size: 20px;
      }
      h1 {
        font-size: 36px;
        margin-right: 0;
        line-height: 0;
      }
      div#resume img {
        margin: 0;
      }
    }
    
    @media screen and (max-width: 320px) {
      body {
        margin: 0;
      }
      img {
        margin: 0;
        margin-bottom: -40px;
      }
      div#resume {
        width: 320px;
        padding: 12px;
        overflow: hidden;
      }   p,
      li {
        margin-right: 20px;
      }
    }
      </style>
  </head>
  
  <body>
  <div id="resume">
      <img src="file://${imagePath}" alt="${req.body.name}">
      <h1><p>${req.body.name}</p></h1>
      <p>Cell: ${req.body.number}</p>
      <p>Age: ${req.body.age}</p>
      <p>Email: ${req.body.email}</a>
      <p id="objective">${req.body.yourself}</p><hr>
      <dl>
          <dt>Education
          <dd>
              <h3>${educationHtml}</h3>
              <p>${educationdescriptionHtml}</p><hr>
      </dl>
      <dl>
          <dt>Skills
          <dd>
              <p>${skillsHtml}</p><hr>
      </dl>
      <dl>
          <dt>Experience
          <dd>
          <h2>${experienceHtml}</h2>
          <p>${experiencedescriptionHtml}</p><hr>
          </dd>
      </dl>
      <dl>
          <dt>Hobbies
          <dd>${hobbiesHtml}<hr>
      </dl>
      <dl>
          <dt>Passion
          <dd>${passionHtml}<hr>
      </dl>
  </div>
</body>
  
  </html>
  `;

    // Options for PDF generation
    var options = { format: 'Letter' }; // You can customize this as needed

    // Generate PDF
    pdf.create(htmlContent, options).toFile('resume.pdf', function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send('Error generating PDF');
      } else {
        console.log(result);
        // Send the generated PDF file as a response
        res.download(path.join(__dirname, '..', 'resume.pdf'));
      }
    });
  });
});

module.exports = router;
