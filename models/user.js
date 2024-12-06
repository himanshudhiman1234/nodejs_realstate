const mongoose =require("mongoose")


const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required : true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    }

})


const User = mongoose.model('User',UserSchema);

module.exports = User