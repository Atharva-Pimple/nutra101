const config=require('config');
const mongoose=require('mongoose');
const Joi= require('joi');
const passwordComplexity=require('joi-password-complexity');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:5,
        maxlength:255
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
        minlength:5,
        maxlength:255,
        unique:true 
    },
    password:{
        type: String,
        required: true,
        minlength:5,
        maxlength:1024 
    },
    isSupplier:{
        type:Boolean,
        default: false
    }
});

userSchema.methods.genAuthToken=function(){
    const token=jwt.sign({_id: this._id, isSupplier:this.isSupplier},config.get('jwtPrivateKey'));
    return token;
}

const User=mongoose.model('User',userSchema);

const complexityOptions = {
    min: 5,
    max: 250,
    upperCase: 1,
    numeric: 1,
    symbol: 1
};

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().min(5).max(255).required(),
        contactNo:Joi.string().min(10).max(12).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions)
    });

    return schema.validate(user);
}

exports.User= User;
exports.validate= validateUser;

