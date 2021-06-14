const express = require('express') 

const app = express() 
 
const cors = require('cors');

const data = require('./assets/weather.json');

const { response } = require('express');

app.use(cors()) 

require('dotenv').config();

const port = process.env.port

app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
}) 

app.get('/weather-data', (req, res)=>{
    res.json(data);
});

 
app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
