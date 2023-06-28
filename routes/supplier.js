const bcrypt=require('bcrypt');
const validateObjectId=require('../middleware/validateObjectId');
const _ = require('lodash');
const {Supplier,validate}=require('../model/supplier');
const express=require('express');
const router=express.Router();


router.get('/:id',validateObjectId,async(req,res)=>{
    
    const supplier=await Supplier.findById(req.params.id);
    if(!supplier) return res.status(404).send('no supplier found of given id');


    res.send(supplier)
});


router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let supplier= await Supplier.findOne({ email: req.body.email});
    if (supplier) return res.status(400).send('supplier already exist');

    supplier= new Supplier(_.pick(req.body,['name','contactNo','email','password']));
    const salt= await bcrypt.genSalt(10);
    supplier.password=await bcrypt.hash(supplier.password,salt);
    await supplier.save()

    const token=  supplier.genAuthToken();

    res.header('sup-auth-token',token).send(_.pick(supplier,['name','contactNo','email']));

});

module.exports=router