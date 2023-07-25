import express from "express"
import passport from "passport"
import bcrypt from "bcrypt"
import User from '../model/user.js'
import fs from 'fs'

const router = express.Router();

router.get('/', (req,res) => {
    res.send("enviroCar Wake Word Model Delivery API")
})

router.get('/download', passport.authenticate('token',{ session: false }), async (req,res) => {
    console.log("Getting")
    try{
        const data = fs.createReadStream('/home/ubuntu/api/enviroCar-model-delivery-api/assets/final.zip');
        const disposition = 'attachment; filename="' + "final.zip" + '"';
        
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', disposition);
        
        data.pipe(res);

        //res.download('/home/ubuntu/api/enviroCar-model-delivery-api/assets/final.zip')
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
})

router.post('/register', async (req,res) => {

    const hash = bcrypt.hashSync(req.body.identifier, 10);

    const newUser = await User.create({identifier: hash});

    res.send({status: "Successful",token: newUser._id});

})

export default router;