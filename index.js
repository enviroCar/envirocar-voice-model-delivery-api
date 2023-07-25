import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import { UniqueTokenStrategy } from 'passport-unique-token'
import 'dotenv/config'
import User from './model/user.js'
import router from './routes/index.js'

try{
  await mongoose.connect(process.env.DB_STRING)
  console.log("Connected to MongoDB.")
}
catch(e){
  console.log(e)
}


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

passport.use(new UniqueTokenStrategy(async (token, done) => {
  try{
    const user = await User.findById(token)
    if(user){
        return done(null, user)
    }
    return done(null, false)
  }
  catch(e){
    return done(e)
  }
  }),
)



app.use(router)

const PORT = process.env.PORT


app.listen(PORT , (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`App is listening to port ` + PORT)
  }
});
