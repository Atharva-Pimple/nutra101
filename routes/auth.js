const bcrypt=require('bcrypt');
const Joi=require('joi');
const {User}= require('../model/user');
const express= require('express');
const router =express.Router()


router.post('/login', async(req,res) =>{
    const {error}=validate(req.body);// res.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const user=await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Invalid email and pass");

    const validPass= bcrypt.compare(user.password, req.body.password);
    if(!validPass) return res.status(400).send("Invalid email and pass");

    const token=user.genAuthToken();

    res.send(token);
});

function validate(req){
    const schema=Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required()
    });

    return schema.validate(req);
}


module.exports=router;