const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");

saveMaterial.post("/save-material", (req,res) => {
    const {name} = req.body;
    const surovina = new modelMaterial({
        name:name
    })
    surovina.save((err,document) => {
        if(err) {
            return res.json({
                msg:"Nedoslo k ulozeni do databaze"
            })
        }else{
            return res.json({
                msg:`doslo k ulozeni receptu ${JSON.stringify(document)}`
            })
        }
        })
        
    })
   

saveMaterial.get("/save-material", (req,res) => {
    res.send("Ano, navstivil jsi /save-material postem")
    
})

module.exports = saveMaterial;