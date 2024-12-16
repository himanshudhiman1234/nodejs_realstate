const express = require("express");
const app = express();
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}))

connectDB();
const registration = require("./routes/registration")
app.set('view engine','ejs')
app.use(express.static('public'));

// Dynamic Layout Selection Middleware
app.use((req, res, next) => {
    if (req.path.startsWith('/admin')) {
        req.app.set('layout', './layout/admin');
    } else if (req.path.startsWith('/user')) {
        req.app.set('layout', './layout/user');
    }else if(req.path.startsWith("/login")){
        req.app.set('layout', './layout/login');
    } 
    else {
        req.app.set('layout', './layout/main');
    }
    next();
});
app.use('/',registration)


app.get('/admin/dashboard',(req,res)=>{
    res.render("admin/dashboard")
})

app.listen(PORT,() =>{
console.log(`Server is running at ${PORT}`)
})