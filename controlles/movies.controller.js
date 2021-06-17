const axios = require('axios'); 
const Movies = require("../models/Movies.models");
require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


const moviesController = (req, res) => {
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
  };

  module.exports = moviesController;