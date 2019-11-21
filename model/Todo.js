const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todotext : {type:String,required:true},
    user_id : {type:String,required:true},
    subtodotext : [],

},{ timestamps: true}
)

module.exports= mongoose.model('todo',todoSchema)