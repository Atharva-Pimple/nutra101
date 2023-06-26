const auth=require('../middleware/auth');
const {Supplier}= require('../model/supplier');
const {validate, Product}=require('../model/product');
const express=require('express');
const validateObjectId=require("../middleware/validateObjectId");
const router=express.Router();

router.get('/',auth,async(req,res)=>{
    
    const prod=await Product.find();

    const allProd={
        "success":true,
        "data": prod
    }

    res.send(allProd)
});

router.get('/:id',[validateObjectId,auth],async(req,res)=>{
    
    const prod=await Product.findById(req.params.id);

    if(!prod) return res.status(404).send('No product found with given id');

    res.send(prod)
});

router.post('/add_product',async(req,res)=>{
    const {error}=validate(req.body);// res.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const supplier=await Supplier.findById(req.body.supplierId);
    if(!supplier) return res.status(400).send('Invalid supplier');

    const prod= new Product({
        name: req.body.name,
        type: req.body.type,
        supplier:{
            _id: supplier._id,
            name: supplier.name,
            contactNo: supplier.contactNo
        },
        price: req.body.price,
        brand: req.body.brand,
        image: req.body.image
    });

    await prod.save();

    res.send(prod);  
});


module.exports=router