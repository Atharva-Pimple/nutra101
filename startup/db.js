const config=require("config");
const mongoose=require("mongoose");
const winston=require("winston");

module.exports=function(){
    const db=config.get('db');
    mongoose.connect(db)
        .then(()=>winston.info(`connected to ${db}`))
        .catch(err=>console.error('could not connect mongoDb'))

}