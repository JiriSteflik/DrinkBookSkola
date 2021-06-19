

const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");
saveMaterial.post("/save-material", async (req,res) => {
    const {name} = req.body;
    const saveMaterial = new modelMaterial({
        name:name
    })
    //najdi surovinu
  modelMaterial.findOne({"name":name}, (err,data) => {
      if(err){
         return res.json({
              msg:"Server neodpovídá"
          })
      }
      
      if(data!== null){
         return res.json({
              msg:"ingredience už existuje."
          })
      }else{
          //Jinak ji tady na klid uložíme
          saveMaterial.save((err,msg) => {
              if(msg._id){
             return res.json({
                  msg:"Ingredience byla uložena!"
              })
            }
          })
      }
  })
})
module.exports = saveMaterial;




/*const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");

saveMaterial.post("/save-material", (req,res) => {
    const {name} = req.body;
    const surovina = new modelMaterial({
        name:name,
        
    })
    surovina.save((err,document) => {
        if(err){
            return res.json({
                msg:"Bohužel nedošlo k uložení ingredience"
            })
        }else{
            return res.json({
                msg: `Došlo k úspěšnému uložení ingredience ${JSON.stringify(document)}`
            })
        }
    })
})
saveMaterial.get("/save-material", (req,res) => {
    res.send("Ano, navštívil jsi /save-material GETEM")
})

module.exports = saveMaterial;


*/
