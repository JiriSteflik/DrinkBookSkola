
const getMaterials = require("express").Router();
const material = require("../../models/material");

getMaterials.get("/get-materials", async (req,res) => {
   material.find({}, (err,docs) => {
         if(err){
           return  res.json({
                 msg:"Nepodařilo se nám získat žádné dokumenty"
             })
         }
        if(docs){
          return  res.json(
                {
                data:docs,
            msg:"Úspěšně jsme získaly ingredience"
        })
        }
        
    }).catch(() => {
        console.log("Nepodařilo se načíst databázi")
    })


})

module.exports = getMaterials;



/*const getMaterials = require("express").Router();
const material = require("../../models/material")
getMaterials.get("/get-materials",(req,res) => {
    material.find({}, (err, docs) => {
        if(err) {
            return res.json({
                msg:"Bohuzel se nepodarilo ziskat zadne dokumenty.",
                documents:[]
            })
        }else{
            return res.json({
                msg:"Uspesne se nam podarilo ziskat suroviny",
                documents:docs
            })
        }
        
    })
   
})

module.exports = getMaterials;
*/