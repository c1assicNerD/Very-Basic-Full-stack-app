const express = require("express");
const zod = require("zod")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const {jwtkey} = require("../config")
const model = require("../db")
const authMiddleware = require("../middleware");
const router = express.Router();
router.get("/balance",authMiddleware,(req,res)=>{
//remembe iski zarurat nahi, you have req.userID in authmiddleware
    const token = req.headers.authorization.split(" ");console.log(token)
    const {userID } = jwt.verify(token[1],jwtkey);
    console.log(`userid in account.js is ${userID}`)
    
   
    model.Account.findOne({userID})
        .then(({Balance})=> res.json({
            Balance
        }))
})
const transferSchema = zod.object({
    to : zod.instanceof(mongoose.Types.ObjectId),//this might not work as Types.objectid is not a native class, it's something mongoose provides
    amount : zod.number()                       //we can use something like zod.refine() or zod.custom()
})  
router.post("/transfer",authMiddleware,async(req,res)=>{
    //actual transaction would be by id , but user would send in username
    //add one validity check for the receiver acc too
    var {to,amount }= req.body
    const userID = mongoose.Types.ObjectId.createFromHexString(req.userID)
    to = mongoose.Types.ObjectId.createFromHexString(to)
    console.log("in /transfer")
    console.log(userID,typeof(userID))

    const session = await mongoose.startSession();
    session.startTransaction()

    const doc = await model.Account.findOne({userID}).session(session);
    console.log(doc);
    if(!doc) {
        await session.abortTransaction();
        return res.status(400).json({
        msg: "Invalid account"
    })}
    else if(doc.Balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
        msg: "Invalid balance"

    })}
      console.log(req.userID)
    
    const sender_acc = await model.Account.findOneAndUpdate({userID:req.userID},{$inc:{Balance:-amount}}).session(session)
    const reciver_acc = await model.Account.findOneAndUpdate({userID:to},{$inc:{Balance:amount}}).session(session)
    await session.commitTransaction();
    return res.status(200).json({
        msg: "Transaction was successful"
    })
})

module.exports = router;