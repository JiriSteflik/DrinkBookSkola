const mongoose = require("mongoose");
const material = new mongoose.Schema({
    name:{
        type:String,
        /*require:true, //dokud to nevyplnim, nemuzu s tim pracovat
        min:5,
        max:255*/
    }

});

module.exports = mongoose.model("material", material);