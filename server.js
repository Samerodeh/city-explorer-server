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

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

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

app.get('/movies', (req, res) => {
  let movies = req.query.query;
  if (movies) {
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movies}`;
    axios.get(moviesUrl).then(responseMovies => {
      const arr = [];

      responseMovies.data.results.map(value => {
        let imageURL = `https://image.tmdb.org/t/p/w500${value.poster_path}`;
        let newMovies = new Movies(value.title, value.overview, value.vote_average, value.vote_count, imageURL, value.popularity, value.release_date);
        arr.push(newMovies);
      });
      res.send(arr);

    }).catch(error => {
      res.send(error.message)
    });
  } else {
    res.send('please provide the proper movies')
  }
});

class weather {

  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;

  }

}

class Movies {
  constructor(title, overview, averageVotes, totalVotes, imgUrl, popularity, releasedOn) {
    this.title = title;
    this.overview = overview;
    this.average_votes = averageVotes;
    this.total_votes = totalVotes;
    this.image_url = imgUrl;
    this.popularity = popularity;
    this.released_on = releasedOn;
  }
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});





