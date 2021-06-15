require('dotenv').config();
 
const express = require('express') 

const app = express() 
 
const cors = require('cors');

const weatherData = require('./assets/weather.json');

const { response } = require('express');

app.use(cors()) 


const PORT = process.env.PORT

app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
}) 

app.get('/weather', (req, res)=>{ 
  const resData = weatherData.data.map (obj => new weather (obj)); 
    res.status(200).send(resData);
});

class weather { 

  constructor (weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;

  }

}
 
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
