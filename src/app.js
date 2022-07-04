const path = require("path");

const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils.js/geoCode");
const forecast = require("./utils.js/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define path
const publicDirectory = path.join(__dirname, "../public");
console.log(publicDirectory);
const partialPaths = path.join(__dirname, "../templates/partials");
//setup handlebar
app.set("views", path.join(__dirname, "../templates/views"));
app.set("view engine", "hbs");
hbs.registerPartials(partialPaths);

//set up static directory
app.use(express.static(publicDirectory));

//route
app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Shubham",
  });
});
app.get("/help", (req, resp) => {
  resp.render("help", {
    helpText: "This is some help text",
    title: "Help Page",
  });
});
app.get("/about", (req, resp) => {
  resp.render("about", {
    title: "About Page",
  });
});

app.get("/products", (req, resp) => {
  console.log(req.query);
  resp.send({
    products: [],
  });
});
app.get("/weather", (req, resp) => {
  if (req.query.address) {
    geoCode(req.query.address, (error, data) => {
      forecast(data, (error, data) => {
        console.log(data);
        resp.send(data);
      });
    });
  }

  // resp.send({
  //   error: "You must provide address",
  // });
});
app.get("/help/*", (req, resp) => {
  resp.render("404", {
    errorMessage: "help article not found",
  });
});
app.get("*", (req, resp) => {
  resp.render("404", {
    errorMessage: "age Not found 404",
  });
});

app.listen(port, () => {
  console.log("Server started"+port);
});
