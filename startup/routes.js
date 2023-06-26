const express=require('express');
const user=require('../routes/users');
const product=require('../routes/products');
const supplier=require('../routes/supplier');
const error=require('../middleware/error');
const auth=require('../routes/auth');

module.exports=function(app){
    app.use(express.json());
    app.use('/api/user',user);
    app.use('/api/product',product);
    app.use('/api/supplier',supplier);
    app.use('/api/auth',auth);
    app.use(error);
}