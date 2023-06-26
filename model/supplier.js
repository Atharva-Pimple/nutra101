const mongoose=require('mongoose');
const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity');

const supplierSchema=new mongoose.Schema({
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
    },
    email:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 55
    },
    password:{
        type: String,
        required: true,
        minlength:5,
        maxlength:1024 
    }
});



const Supplier=mongoose.model('supplier',supplierSchema);

const complexityOptions = {
    min: 5,
    max: 250,
    upperCase: 1,
    numeric: 1,
    symbol: 1
};

function validateSupplier(supplier){
    const schema=Joi.object({
        name:Joi.string().min(5).max(255).required(),
        contactNo:Joi.string().min(10).max(12).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(supplier);
}

exports.Supplier=Supplier;
exports.supplierSchema=supplierSchema;
exports.validate= validateSupplier;

