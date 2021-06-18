const axios = require('axios'); 

const Movies = require("../models/Movies.models");

const Cache = require('../helper/cache');

const { response } = require('express'); 

require('dotenv').config();


const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const cacheObj = new Cache();


const moviesController = (req, res) => {
    let movies = req.query.query;

    const requestKey = `movies-${movies}`;  

  
    if (movies) {

      if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) { 
        
        res.send(cacheObj[requestKey])

      } else {
      const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movies}`;
      axios.get(moviesUrl).then(responseMovies => {
        const arr = [];
      
  
        responseMovies.data.results.map(value => {
   
          let imageURL = `https://image.tmdb.org/t/p/w500${value.poster_path}`;
          let newMovies = new Movies(value.title, value.overview, value.vote_average, value.vote_count, imageURL, value.popularity, value.release_date);
          arr.push(newMovies);
        });
        
        cacheObj[requestKey] = arr; 
        cacheObj[requestKey].timestamp = Date.now();
        res.send(arr);
  
      }).catch(error => {
        res.send(error.message)
      });
      }
    } else {
      res.send('please provide the proper movies')
    }
  };

  module.exports = moviesController;