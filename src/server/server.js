const path = require("path");

/**
 * Load environment variables from .env file
 */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

/**
 * Used middleware to parse the request body
 */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Used middleware to enable CORS
 */
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

/**
 * Check if environment variables
 */
let PORT = process.env.PORT || 8082;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}...`);
});

// route for testing server
app.get("/test", function (req, res) {
  res.send({ message: "hello" });
});

/**
 * TODO: Get data from server side then show in client
 * 1: Get from API Geoname
 * 2: Get API Weather after get name
 * 3: Get API Pixabay after get weather
 */
app.post("/location", getLocation);

async function getLocation(req, res) {
  const location = req.body.location;
  const url = `http://api.geonames.org/searchJSON?formatted=true&q=${location}&maxRows=10&ang=es&username=${geoname}&style=full`;

  const response = await fetch(url);

  try {
    const data = await response.json();
    let datas = {
      lng: data.geonames[0].lng,
      lat: data.geonames[0].lat,
    };
    res.send(datas);
  } catch (error) {
    console.log(" Error: ", error);
  }
}

app.post("/getweather", getWeather);

async function getWeather(req, res) {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherkey}`;
  const response = await fetch(url);
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(" Error: ", error);
  }
}

app.post("/getphoto", getPhoto);

async function getPhoto(req, res) {
  const city = req.body.city;
  console.log(city);
  const url = `https://pixabay.com/api/?key=${pixabaykey}&q=${city}&image_type=photo&orientation=vertical`;
  const response = await fetch(url);
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(" Error: ", error);
  }
}
