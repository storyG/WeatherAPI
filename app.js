const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appid = "a6b5a9c378c50f81e5bb906916e183ec";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;

  https.get(url, function (response) {
    console.log("statusCode: ", response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(description);
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees.<br>")
      res.write("The weather is currently " + description + ".</h1>")
      res.write("<img src = " + imgURL + ">");
      res.send();
    })
  });
})

//

app.listen(3000, function () {
  console.log("server started on port 3000.");
});