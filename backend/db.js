const mongoose = require("mongoose")
const {model } = require("mongoose")
mongoose.connect('mongodb+srv://aanandy222:Chi11X@cluster0.ajgdpkm.mongodb.net/Paytm')

 const userSchema = new mongoose.Schema({
    
    Firstname: String,
    Lastname: String,
    Username: String,
    Password: String
})
const accountSchema  = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    Balance : {
        type: Number,
        required: true
    }
})
 const user  = model("User",userSchema);
 const Account = model("Balancesheet",accountSchema)
 module.exports = {user,Account}