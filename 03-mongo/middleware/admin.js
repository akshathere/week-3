// Middleware for handling auth
const {Admin}=require("../db")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    console.log(req.headers.username)    
    console.log(req.headers.password) 

    Admin.findOne({username: req.headers.username,
        password: req.headers.password})
        .then(function(value){
            if(value){
                console.log(value);
                next();
            }
            else{
                console.log(value)
                res.status(403).send("error admin username or password is incorrect")
            }
        })
}

module.exports = adminMiddleware;