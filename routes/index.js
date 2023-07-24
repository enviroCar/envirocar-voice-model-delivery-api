import express from "express"
import passport from "passport"
import bcrypt from "bcrypt"
const User = require("../model/user");

const router = express.Router();

router.get('/', (req,res) => {
    res.send("enviroCar Wake Word Model Delivery API")
})

router.get('/download', passport.authenticate('token'), async (req,res) => {
    
    res.sendFile('../assets/final.zip')
})

router.post('/register', async (req,res) => {

    const hash = bcrypt.hashSync(req.body.identifier, 10);

    const newUser = await User.create({identifier: hash});

    res.send({status: "Successful",token: newUser._id});

})

module.exports = router;