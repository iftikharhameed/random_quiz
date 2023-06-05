const mongoose = require('mongoose');
const {Schema} = mongoose

const cartSchema = new Schema({

    question:{
        type:String,
        require:true,
    },

    options:{
        type:[String],
        require:true,
    },

    correct:{
        type:String,
        require:true,
    },



})


module.exports=mongoose.model('quiz',cartSchema)