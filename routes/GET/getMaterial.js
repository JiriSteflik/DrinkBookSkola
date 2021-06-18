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
const getMaterials = require("express").Router();
const material = require("../../models/material");

getMaterials.get("/get-materials", async (req,res) => {
   material.find({}, (err,docs) => {
         if(err){
           return  res.json({
                 msg:"Server není připojený k databázi"
             })
         }
        if(docs){
          return  res.json(
                {
                data:docs,
            msg:"Data byla získána"
        })
        }else{
          return  res.json({
                data:[],
                msg:"Bohužel, nešlo načíst seznam potravin"
            })
        }
    }).catch(() => {
        console.log("Server není připojený k databázi")
    })


})

module.exports = getMaterials;