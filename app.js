// jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request =  require("request");

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

const apiKey = process.env.API_KEY;
console.log(apiKey);

const defaultCity = "Wellington";
const url = "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&units=metric&appid=" + apiKey;
// https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
// "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${0f01ff770fa773cfeff0f05168bf15f8}"
// ${city}

app.get("/", function(req, res){
  request(url, function(error, response, body){
    const weather = JSON.parse(body);

    res.render("home", {
      temp: weather.main.temp,
      cityName: weather.name,

    });
  });

});


app.post("/", function(req, res){
  //Parse requested city to app
  const city = req.body.city;
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

  // make api request
  request(url, function(error, response, body){
    const weather = JSON.parse(body);
    res.render("home", {
      temp: weather.main.temp,
      cityName: weather.name
    });

    // have an if statement, and change icon depending on number
    });
});






app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
