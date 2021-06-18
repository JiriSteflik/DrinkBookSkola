

const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");
saveMaterial.post("/save-material", async (req,res) => {
    const {name} = req.body;
    const saveMaterial = new modelMaterial({
        name:name
    })
    //Nejdřív najdi, zda už taková surovina neexistuje
  modelMaterial.findOne({"name":name}, (err,data) => {
      if(err){
         return res.json({
              msg:"Bohužel došlo k neznámě chybě nebo server nekomunikuje s DB"
          })
      }
      //Pokud ano, tak už surovinu neukládejme
      if(data!== null){
         return res.json({
              msg:"Bohužel, tuhle surovinu už evidujeme!"
          })
      }else{
          //Jinak ji tady na klid uložíme
          saveMaterial.save((err,msg) => {
              if(msg._id){
             return res.json({
                  msg:"Surovina byla úspěšně uložena v našem seznamu!"
              })
            }else{
            return  res.json({
                msg:"Surovina nemohla být uložena" + err.toString()
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
