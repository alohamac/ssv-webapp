/********************************
 * File: user.js
 * File containing the user schema and its functions.
 */
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";
 
var SALT_WORK_FACTOR = 10;
 
const userSchema = mongoose.Schema({
    userID: {type: String, index: {unique: true}, default: ()=>new ObjectId()},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    phoneNumber: {type: String, required: true},
    password: { type: String, required: true },
})

/* 
    Function: userSchema.pre()
    This function is for whenever a user is saved, then it will encrypt their given password.
*/
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
 
 /* 
    Function: userSchema.validatePassword()
    This function is for validating a password for logging in. 
 */
userSchema.methods.validatePassword = async function validatePassword(data) {
    return await bcrypt.compare(data, this.password);
};
 
const User = mongoose.model('User', userSchema)

export default User;