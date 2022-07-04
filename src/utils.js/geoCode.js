const request = require("request");
var geoCode = function (adress, callback) {
  console.log(adress);
  var geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?limit=1&access_token=pk.eyJ1IjoiYmFzd2FkZXAiLCJhIjoiY2w0eGlpcm0xMWd1ZTNqbXpvNXMzZm9wbiJ9.Jw2JbTXWTo_07aCr9b1d6Q`;

  request({ url: geoCodingUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect location", undefined);
    } else if (response.body.features.length === 0) {
      console.log(response);
      callback("Invalid Location", undefined);
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const placeName = response.body.features[0].place_name;
      var data = {
        latitude,
        longitude,
        placeName,
      };
      console.log(data);
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
