require('dotenv').config();

module.exports=function(){
    if(!process.env.jwtPrivateKey){
        throw new Error('FETAL Error. jwtPrivatekey not defined');
}
}