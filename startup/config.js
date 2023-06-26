
const config=require('config');

module.exports=function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('FETAL Error. jwtPrivatekey not defined');
}
}