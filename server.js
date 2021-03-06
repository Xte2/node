const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.originalUrl}`;
  // fs.appendFile('server.log', log + '\n', (err) => {
  //   if (err){
  //     console.log('Unable to append to server.log');
  //   }
  // })
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res)=> {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //     name: 'Andrew',
  //     likes: [
  //       'Biking',
  //       'Cities'
  //     ]
  // });
  res.render('home.hbs',{
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to my website'
  });
});

//register handler
app.get('/about',(req,res)=> {
  // res.send('<h1>Hello Express</h1>');
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

//register handler
app.get('/projects',(req,res)=> {
  res.render('projects.hbs',{
    pageTitle: 'Projects'
  });
});

app.get('/bad',(req,res)=> {
  // res.send('<h1>Hello Express</h1>');
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(port, () => {
  console.log(`Sever is up on port ${port}`);
});
