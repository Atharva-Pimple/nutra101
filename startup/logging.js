require('express-async-errors');
const winston=require('winston');
// require('winston-mongodb');

module.exports=function(){
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    // winston.add(new winston.transports.MongoDB({
    //     db:'mongodb://127.0.0.1:27017/nutra101',
    //     level: 'error'
    // }));

    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtExceptions.log'})
    );  

    winston.add(new winston.transports.File({
        filename: 'uncaughtRejection.log',
        handleRejections: true
    }));
}