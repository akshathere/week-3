const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {JWT_SECRET}=require("../config")
const { User,Admin,Course } = require("../db");
const router = Router();
const jwt=require("jsonwebtoken")
// Admin Routes
router.post('/signup',async (req, res) => {
    let username=req.body.username;
    let password=req.body.password;
    await Admin.create({
        username,
        password
    })

    // const user = new Admin({username: req.body.username
    //     ,password: req.body.password });
    
    res.json({
            message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.headers.username
    const password=req.headers.password
    const user= await Admin.findOne({
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

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const user=new Course( { title: req.body.title,
        description: req.body.description,
         price: req.body.price,
            imageLink: req.body.imageLink
       })
       user.save()
   
       res.json({
           message: 'Course created successfully', courseId: user._id
       })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then(courses=>{
        res.json({
            courses
        })
    })
});

module.exports = router;