require('dotenv').config();

const express = require('express')

const app = express()

const cors = require('cors');

const weatherData = require('./assets/weather.json');

const { response } = require('express');

const axios = require('axios');

app.use(cors())


const PORT = process.env.PORT

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.get('/',
  function (req, res) {
    res.send('Hello World')
  })

app.get('/weather', (req, res) => {
  const resData = weatherData.data.map(obj => new weather(obj));
  

  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.weatherData.data.map(obj => new Weather(obj));
      res.json(responseData)
    }).catch(error => {
      res.send(error.message)
    });
  } else {
    res.send('please provide the proper lat and lon')
  }
  res.status(200).send(resData);
});

class weather {

  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;

  }
 
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

