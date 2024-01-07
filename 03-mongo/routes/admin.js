const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
// Admin Routes
router.post("/signup", async (req, res) => {
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

router.post('/courses', adminMiddleware, (req, res) => {
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
    Course.find().then(courses=> {
        res.json({
            courses
        })
    })
});

module.exports = router;