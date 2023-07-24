import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
const { UniqueTokenStrategy } = require('passport-unique-token');
require('dotenv').config();

const routes = require('./routes');

await mongoose.connect(process.env.DB_STRING, () => { console.log("Connected to MongoDB.") });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passport.use(new UniqueTokenStrategy((token, done) => {
    User.findById(token,
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      },
    );
  }),
);



app.use(routes);

const PORT = process.env.PORT;


app.listen(PORT , (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`App is listening to port ` + PORT);
  }
});
