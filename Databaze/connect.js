const Mongoose = require('mongoose');
const dotenv = require("dotenv");
class dbConnect {
    connect(){
        dotenv.config();
        Mongoose.connect(process.env.DB_CONNECT,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        }, (err) => {
            if(err) throw new Error("K databazi se nejde pripojit");
            console.log("Jsi uspesne pripojen k databazi");
        })
     }
 }


module.exports = new dbConnect;