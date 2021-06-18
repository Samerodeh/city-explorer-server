const axios = require('axios');

const Weather = require('../models/Weather.models');

const Cache = require('../helper/cache');

const { response } = require('express');

require('dotenv').config();



const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const cacheObject = new Cache();

const weatherController = (req, res) => {

  

  const lat = req.query.lat;
  const lon = req.query.lon;

  const reqKey = `weather-${lat}-${lon}`;  
 


  if (lat && lon) {

    if (cacheObject[reqKey] && (Date.now() - cacheObject[reqKey].timestamp < 86400000)) { 
      res.json(cacheObject[reqKey])
 
  } else {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.data.data.map(obj => new Weather(obj));

      cacheObject[reqKey] = responseData; 
      cacheObject[reqKey].timestamp = Date.now();
      res.json(responseData)
    }).catch(error => {
      res.send(error.message)
    });
  }
   } else {
  res.send('please provide the proper lat and lon')     
    }
  
  };


module.exports = weatherController;        