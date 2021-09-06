const router = require('express').Router();
const UserModel = require('../models/user.model');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


//getting of user
router.get('/user', async (req,res) => {
    try {
        let user = await UserModel.findById(req.user.id, "-password");
        res.status(200).json({user});
    } catch (e) {
        res.status(400).json({ message: "something went wrong" });
    };
});


// registering of user.
router.post('/register', async (req,res) => {
    try {

        let emailSearch = await UserModel.findOne({email: req.body.email});

        if(emailSearch){
            res.status(400).json({ message: "Duplicate email, Please use another email" });

        } else {

            let user = new UserModel(req.body);
            user.password = await bcrypt.hash(user.password, 10);

            let newNanoId = await nanoid(8).toUpperCase();
            user.id = `${(user.userType === "User") ? "U-" : "S-"}${newNanoId}`;
            
            console.log(user);
            await user.save();

            let token = jwt.sign({
                user: {
                    id: user_id,
                    userType: user.userType,
                }
            }, process.env.JWTSECRET, {expiresIn: "7d"});

            res.status(201).json({token});
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "user not created" });
    }
})




module.exports = router