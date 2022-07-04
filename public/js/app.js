console.log("client side javascript loaded");

fetch("https://puzzle.mead.io/puzzle").then(function (response) {
  response.json().then((data) => {
    console.log(data);
  });
});

const weather = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const meesageTwo = document.querySelector("#message-two");
messageOne.textContent = "From Javascript";
weather.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Hello world");
  console.log(search.value);
  fetch(`/weather?address=${search.value}`).then(function (
    response
  ) {
    console.log(response);
    response.json().then((data) => {
      meesageTwo.textContent = data.forecast;
    });
  });
});
