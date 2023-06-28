require('dotenv').config();
const mongoose=require("mongoose");
const winston=require("winston");

module.exports=function(){
    mongoose.connect(process.env.db)
        .then(()=>winston.info(`connected to mongodb`))
        .catch(err=>console.error('could not connect mongoDb'))

}