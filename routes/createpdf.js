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
router.post('/generatepdf',function (req, res) {


  const education = req.body['education[]'];
  const skills = req.body['skills[]'];
  const passion = req.body['passion[]'];
  const hobbies = req.body['hobbies[]'];
  const experience = req.body['experience[]'];
  const education_description = req.body['education_description[]'];
  const experience_description = req.body['experience_description[]'];


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
    var htmlContent = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        #resume-container {
            width: 100%;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            background-color: #fff;
        }

        h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        h2 {
            font-size: 20px;
            margin: 10px 0 5px 0;
            color: #333;
        }

        p {
            margin: 4px 0;
            font-size: 16px;
            color: #444;
        }

        .section-title {
            border-bottom: 2px solid #333;
            margin-bottom: 10px;
            padding-bottom: 5px;
        }

        .contact-info {
            margin-bottom: 20px;
        }

        .contact-info p {
            font-size: 14px;
            color: #666;
        }

        .skills, .experience, .education, .hobbies, .passion {
            margin-bottom: 20px;
        }

        .skills p, .experience p, .education p, .hobbies p, .passion p {
            margin: 4px 0;
        }

        .sub-section {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .details {
            font-size: 14px;
            color: #555;
            margin-left: 10px;
        }

        .small-text {
            font-size: 12px;
            color: #777;
        }

        hr {
            margin: 20px 0;
            border: none;
            border-top: 1px solid #ddd;
        }
    </style>
</head>

<body>
    <div id="resume-container">
        <h1>${req.body.name}</h1>
        <p class="small-text">Email: ${req.body.email} | Phone: ${req.body.number} | Age: ${req.body.age}</p>

        <hr>

        <div class="contact-info">
            <h2 class="section-title">Professional Summary</h2>
            <p>${req.body.yourself}</p>
        </div>

        <div class="education">
            <h2 class="section-title">Education</h2>
            ${educationHtml}
        </div>

        <div class="skills">
            <h2 class="section-title">Skills</h2>
            ${skillsHtml}
        </div>

        <div class="experience">
            <h2 class="section-title">Experience</h2>
            ${experienceHtml}
        </div>

        <div class="hobbies">
            <h2 class="section-title">Hobbies</h2>
            ${hobbiesHtml}
        </div>

        <div class="passion">
            <h2 class="section-title">Passion</h2>
            ${passionHtml}
        </div>
    </div>
</body>

</html>

  `;

    // Options for PDF generation
    var options = { 
      format: 'Letter',
    }; // You can customize this as needed

    console.log(options.base);
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

module.exports = router;
