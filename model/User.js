const mongoose = require('mongoose');

const userScheama = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    password:{type:String},
    password2:{type:String} , 
    image:{type:String},
},{ timestamps: true}
)

module.exports= mongoose.model('user',userScheama)