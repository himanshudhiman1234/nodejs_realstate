const express = require("express");
const app = express();
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}))

connectDB();
const registration = require("./routes/registration")
app.set('view engine','ejs')

app.use('/',registration)

app.listen(PORT,() =>{
console.log(`Server is running at ${PORT}`)
})