const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const user=new User({
        username: req.body.username,
         password: req.body.password
    })
    user.save();
    res.json({
        message: 'User created successfully' 
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then(courses=> {
        res.json({
            courses
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({
        username:username
    },{
        "$push":{
            courses_purchased: id
        }
    })
    res.json({
        msg: "purchase complete"
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user=await User.findOne({
        username:req.headers.username,
        password: req.headers.password
    })
    console.log(user.courses_purchased)
    const course=await Course.find({
        _id: {
            "$in": user.courses_purchased
        }
    })
    res.json({
        courses: course
    })
});

module.exports = router