const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    passportId : {
        type: String,
        required: true,
        validate : {
            validator : (v =>{
                return v.length === 9
            })
        }
    },
    cash: {
        type: Number,
        default : 0 ,
        },
    credit: {
        type: Number,
        default : 0 ,
        min:[0 , 'The get the min limite'],
    },
    name: {
        type: String,
        required: true,
        match:/^[a-zA-Z]*$/ 
    },
    email: {
        type: String,
        required: true,
        match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },
    isActive : {
        type : Boolean,
        default : true
    }
})

const bank = mongoose.model('bank', bankSchema)

module.exports = {
    bank
}