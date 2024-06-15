const express = require(
    "express"
)

const authMiddleware = require("../middleware")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const mongoose = require("mongoose")
const model = require("../db")
const { jwtkey } = require("../config")

const app = express();
const router = express.Router();
const inputValidation = zod.object({

    Firstname: zod.string(),
    Lastname: zod.string(),
    Username: zod.string(),
    Password: zod.string()
})
const signinprototype = zod.object({
    Username: zod.string(),
    Password: zod.string()
})

router.post("/signup", function (req, res) {
    let userID;
    var token;
    console.log("Hi there")
    
    try {
        inputValidation.parse(req.body)
    }
    catch (err) {
        return res.send("Tum chutiya input dala hai ")
    }
    try {
        model.user.findOne({ Username: req.body.Username }).then(value => {
            if (value){console.log(value); return res.send(value + "Username already exists!");}
            else {
                const person = new model.user({

                    Firstname: req.body.Firstname,
                    Lastname: req.body.Lastname,
                    Username: req.body.Username,
                    Password: req.body.Password
                })
                console.log(person)
                person.save().then(() => {



                    console.log("User saved successfully")

                    userID = person._id
                
                token = jwt.sign({ userID }, jwtkey);
                
                model.Account.create({
                    userID,
                    Balance: 1 + Math.random() * 10000
                }).then(({ Balance }) => res.json({
                    userID,
                    Balance,
                    token
                }))});

            }
        })
    }
    finally { console.log(" Req End") }

})
router.post("/signin", function (req, res) {
    const signinbody = {
        Username: req.body.Username,
        Password: req.body.Password
    }
    const { success } = signinprototype.safeParse(signinbody);
    console.log(success);
    if (!success) return res.json({
        msg: "chutiya input dale ho ji"
    })
    model.user.findOne(signinbody)
        .then((user) => {
            if (user._id) {
                var token = jwt.sign({ userID: user._id }, jwtkey)
                return res.json({
                    token
                })
            }
            return res.status(411).json({
                msg: "User doesn't exist"
            })
        })
})
const updateschema = zod.object({
    Password: zod.string().optional(),
    Firstname: zod.string().optional(),
    Lastname: zod.string().optional()
})
router.put("/", authMiddleware, function (req, res) {
    const body = req.body;
    const [bearer, token] = req.header("authorization").split(" ")
    try {
        updateschema.parse(req.body);
    }
    catch {
        return res.status(403).send("Zod input error");
    }
    console.log(`in user/ token is ${token}`)
    const { payloadid } = jwt.verify(token, jwtkey)
    model.user.findOne({ payloadid }).then(
        (doc) => {
            if (body.Firstname) doc.Firstname = body.Firstname;
            if (body.Lastname) doc.Lastname = body.Lastname;
            if (body.Password) doc.Password = body.Password;

            doc.save().then(
                updated_doc => res.json({
                    msg: "User updated successfully",
                    updated_doc
                })
            )

        })
})

router.get("/bulk", (req, res) => {
    const filter = req.query.param.toString();
    console.log(filter,typeof(filter))
    model.user.find({
        $or: [
            { Firstname: new RegExp(filter, "i") }
            ,
            {
                Lastname: {
                    "$regex": filter
                }
            }
        ]
    })
        .then((doc) => {//you can do doc.set("Password" = null)
            //another approach : 
            // const sanitized_doc = doc.map(c=>{
            //     const {Password,...safedoc} = c.toObject()//this is known as the rest parameter
            //  it extracts the remaining properties
            //     console.log(safedoc) 
            //     return safedoc;
            // }) also worked when we didn't use toObject, but it also logged bunch of hidden fields
            const safedoc = doc.map(c => {
                const safeobj = c.toObject();
                delete safeobj.Password;
                return safeobj;
            })



            return res.json({
                safedoc
            })
        })
})


module.exports = router;