const express = require("express");
const app = express();
const mainRouter = require("../backend/routes/index")
const cors  = require("cors")

app.use(cors());
app.use(express.json())
app.use("/api/v1",mainRouter)
app.get("/helo",(req,res)=>res.send("Hello world"))

const gg  = app.listen(3000,(value)=>{
    console.log("App is listening no the port 3000")
    console.log(value)
});
