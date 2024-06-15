const UserRouter = require("../routes/user")
const AccountRouter = require("../routes/account")
const express = require("express");


const router = express.Router();
router.use("/user",UserRouter)
router.use("/account",AccountRouter)




module.exports = router