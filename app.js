require('dotenv').config();
const Joi=require("joi");
Joi.objectId=require('joi-objectid')(Joi);
const express=require('express');
const app=express();

require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/prod')(app);

const port=process.env.PORT || 3000 
app.listen(port, () => console.log(`Listning on PORT ${port}...`));

