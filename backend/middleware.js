const zod = require("zod")
const jwt = require("jsonwebtoken")
const {jwtkey} = require("../backend/config")
function authMiddleware(req,res,next){
    console.log("In authmiddleware")
    const auth = req.headers.authorization;
    console.log(auth)
    
    const autharr = auth.split(" ");
    console.log(typeof(autharr[1])== 'string')
    console.log(autharr[0]=='"Bearer')
    
    if(autharr[0]=='Bearer' && typeof(autharr[1])== 'string'){
       try {console.log(autharr[1]);
        console.log(jwtkey);
        var decoded = jwt.verify(autharr[1],jwtkey);
        console.log(`decoded = ${decoded}`)
       }
       catch(err){return res.status(403).json({
        msg: "Invalid token",
        err
       })}

       req.userID = decoded.userID;
       console.log("Userid added in reqest object",req.userID)

    }
    else return res.status(403).json({
        msg: "Invalid input"
    })
    console.log("auth passed")
    next();
}


module.exports = authMiddleware