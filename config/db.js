const mongoose = require("mongoose");

const connectDB = async(req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{

        })
        console.log("connected")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB;