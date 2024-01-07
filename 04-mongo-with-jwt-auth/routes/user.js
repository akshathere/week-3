const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    let username=req.body.username;
    let password=req.body.password;
    await User.create({
        username,
        password
    })
    res.json({
        message: 'Admin created successfully'
})
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.headers.username
    const password=req.headers.password
    const user= await User.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({
        username
    },JWT_SECRET)
    res.json(token)
    }else{
        res.status(403).json({
            msg: "wrong id or pass"
        })
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then(value=>{
        res.json({
            value
        })
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const id=req.params.courseId
    username=req.username
    
        User.updateOne({
            username:username
        },{
            "$push":{
                courses_purchased:id
            }
        })
        res.json({
            msg: " done scene"
        })
    
    
    

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router