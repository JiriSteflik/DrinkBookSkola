const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const db = require("./Databaze/connect")

db.connect();

app.get("/", (request,response) => {
    response.send("Hlavni stranka na muj sprojekt");

});

app.listen(PORT, (err) => {
    console.log(`serve bezi na ${PORT}!`)
});