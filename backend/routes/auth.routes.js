const router = require('express').Router();
const UserModel = require('../models/user.model');
const checkUser = require('../lib/checkUser');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


//getting of user
router.get('/user', checkUser, async (req,res) => {
    try {
        let user = await UserModel.findById(req.user.id, "-password");
        res.status(200).json({user});
    } catch (e) {
        res.status(400).json({ message: "something went wrong" });
    }
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
});

// log in user
router.post('/login', async (req,res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        //if user is not in DB.
        if(!user){
            throw "user not found";
        };

        // if user is in DB, check password.
        if(!user.validPassword(req.body.password)){
            throw "check user password";
        };

        let token = jwt.sign({
            user: {
                id: user._id,
                userType: user.userType
            }
        }, process.env.JWTSECRET, { expiresIn: "7d" });

        res.status(200).json({token});

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
});

// change password
router.post('/update', checkUser, async (req,res) => {
    try {
        let updateObj = req.body;

        await (updateObj.password) ? updateObj.password = await bcrypt.hash(updateObj.password, 10) :

        await UserModel.findByIdAndUpdate(req.user.id, {
            $set: {...updateObj}
        });

        res.status(200).json({ message: "password updated" });
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

router.delete('/delete', checkUser, async (req,res) => {
    try {
        let deleteObj = await UserModel.findByIdAndDelete(req.user.id);
        console.log("deleted: ", deleteObj);
        res.status(200).json({ message: "user deleted" });

    } catch (e) {
        res.status(400).json({ message: e });
    }
});


module.exports = router