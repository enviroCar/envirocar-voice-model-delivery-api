import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    identifier: String
}, { timestamps: true});

const User = new mongoose.model('User', userSchema);

export default User;