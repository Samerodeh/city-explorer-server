const express = require('express')

const app = express()

require('dotenv').config();

const PORT = process.env.PORT

const cors = require('cors');


app.use(cors())


const weatherData = require('./assets/weather.json');

const { response } = require('express'); 


app.get('/',
  function (req, res) {
    res.send('Hello World');
  });

const weatherController = require('./controlles/weather.controller');

app.get('/weather', weatherController);

const moviesController = require('./controlles/movies.controller');

app.get('/movies', moviesController);


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});





