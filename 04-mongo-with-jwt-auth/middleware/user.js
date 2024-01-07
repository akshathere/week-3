const jwt=require("jsonwebtoken")

const {JWT_SECRET}=require("../config")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token =req.headers.authorization;
    const arr=token.split(" ")
    const tok=arr[1];
    const decoded= jwt.verify(tok,JWT_SECRET)
    req.username=decoded.username
    if(decoded.username){
        next();
    }else{
        res.status(403).send("You are not authenticated");
    }
}

module.exports = userMiddleware;