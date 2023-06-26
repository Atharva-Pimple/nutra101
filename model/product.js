const mongoose=require('mongoose');
const Joi= require('joi');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    type:{
        type:String,
        required:true,
        minlength:3,
        maxlength:55
    },
    supplier:{
        type:new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 4,
                maxlength: 55
            },
            contactNo:{
                type: String,
                required: true,
                minlength:10,
                maxlength:12
            }
        }),
        required: true
    },
    price:{
        type: String,
        required:true
    },
    brand:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    image:{
        type: String,
        required: true
    }
});

const Product=mongoose.model('product',productSchema);


function validateProduct(product){
    const schema=Joi.object({
        name:Joi.string().min(5).max(255).required(),
        type:Joi.string().min(3).max(55).required(),
        supplierId: Joi.objectId().required(),
        price: Joi.string().required(),
        brand: Joi.string().min(5).max(255).required(),
        image: Joi.string().required()
    });

    return schema.validate(product);
}

exports.Product=Product;
exports.validate= validateProduct;
