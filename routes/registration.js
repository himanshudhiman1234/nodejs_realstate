const express =  require("express");

const router = express.Router();
const {login,registration,UserRegistration,Submitlogin} = require("../controller/registrationController")

router.get("/login",login)
router.post("/user-login",Submitlogin)
router.get("/registration",registration)
router.post("/user-registration",UserRegistration)
module.exports = router;