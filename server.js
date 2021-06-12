const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const db = require("./Databaze/connect");
const getMaterials = require("./routes/GET/getMaterial");
const saveMaterial = require("./routes/post/saveMaterial")
db.connect();
/**
 * Musim rict expressu, ze tam posilam z db jason, nebo text... 
 * Povolme prijimat json z frontendu
 */
 app.use(express.json({extended:false}));
 app.use(express.text({extended:false}));
/**
 *  Routy - get
 */
app.use("/", getMaterials);
/**
 * Routy - post
 */
app.use("/", saveMaterial);


app.get("/", (request,response) => {
    response.send("Hlavni stranka na muj sprojekt");

});

app.listen(PORT, (err) => {
    console.log(`serve bezi na ${PORT}!`)
});