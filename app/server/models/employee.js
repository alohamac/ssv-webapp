/********************************
 * File: employee.js
 * File containing the employee schema and its functions.
 */
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import speakeasy from "speakeasy"
import { ObjectId } from "mongodb";

var SALT_WORK_FACTOR = 10;

const employeeSchema = mongoose.Schema({
    employeeID: {type: String, index: {unique: true}, default: ()=>new ObjectId()},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    phoneNumber: {type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: "mod"},
    secret: { type: String, required: true, index: {unique: true}, default: ()=>speakeasy.generateSecret().base32},
    registrationVerified: { type: Boolean, required: true, default: false} 
})

/* 
    Function: employeeSchema.pre()
    This function is for whenever a employee is saved, then it will encrypt their given password.
*/
employeeSchema.pre('save', function(next) {
    var employee = this;

    // only hash the password if it has been modified (or is new)
    if (!employee.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(employee.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            employee.password = hash;
            next();
        });
    });
});

/* 
    Function: employeeSchema.validatePassword()
    This function is for validating a password for logging in. 
*/
employeeSchema.methods.validatePassword = async function validatePassword(data) {
    return await bcrypt.compare(data, this.password);
};

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;