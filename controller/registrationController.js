const User = require("../models/user")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const login = async(req,res) =>{
   

    res.render("login")
}
const Submitlogin =async(req,res)=>{

const {email,password} = req.body;

if(!email,!password){
    return res.status(400).json({message:"Please fill all details"})
}
const user = await User.findOne({email})


const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
    return res.status(400).json({message:"Invalid Credential"})
}

const token = jwt.sign({ id:user._id,email:user.email,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
)
res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Secure in production only
    maxAge: 3600000  // 1 hour
});

// Redirect based on role
if (user.role === "admin") {
    res.redirect("/admin/show-users");
} else if(user.role === "user") {
    res.redirect("/buyer");
}else if(user.role === "seller"){
    res.redirect("/seller")
}else{
    res.redirect("/agent")
}

}
const registration = async(req,res) =>{
    res.render("registration")
}


const UserRegistration =async(req,res)=>{

    try{

   
const {fullname,email,phone,role,password,address} = req.body;

// console.log(fullname,email,phone,role,password,address)
if(!fullname || !email || !phone ||! role || !password || !address){
        return res.status(400).json({message:"All fields are required"})
}

const existingUser = await User.findOne({email})

if(existingUser){
    return res.status(400).json({message : "User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)
    const newuser = new User({
        fullname,
        email,
        phone,
        role,
        password:hashedPassword,
        address
    })

    await newuser.save();
    res.redirect("/login")
}catch(error){
    console.log(error)
}

}
module.exports = {login,registration,UserRegistration,Submitlogin}