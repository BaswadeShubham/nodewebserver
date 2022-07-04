const request = require("request");

const forecast = function (data, callback) {
  var url = `http://api.weatherstack.com/current?access_key=29223d2d5b2cd7510e16313bd261df72&query=${
    (data.latitude, data.longitude)
  }&units=f`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("error", "Unable to connect weather API");
    } else if (response.body.error) {
      callback("error", "Unable to find location");
    } else {
      callback("Data", {
        forecast: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feel: response.body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
