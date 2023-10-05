/************************************************************
 * File: controllers/employees.js
 *
 * This file will contain the controllers responsible for
 * performing CRUD operations related to employees
 *
 * Current CRUD ops:
 *  - Login user
 *  - Register user
 */


import User from "../models/user.js";
import jwt from "jsonwebtoken"
import speakeasy from "speakeasy"

/*****************************************************************
 * Function: loginUser
 *
 * Function for logging in a user.
 * Returns: 
 *  if successful: returns a login token for a user 200.
 *  else: 401
 *****************************************************************/
export const loginUser = async (req, res) => {
    const info = req.params;
    try {
        const user = await User.findOne({ userName: info.username })
        const isMatch = await user.validatePassword(info.password)
        if (!isMatch)
            throw new Error('Invalid username or password.')
        const token = jwt.sign(user.userName, "key")
        jwt.sign({
            username: user.userName
        }, 'key', (err, token) => {
            if (err) {throw err;}
            res.json({
                token,
                user: {
                    username: user.userName
                }
            });
        });
    } catch (error) {
        error.message = 'Invalid username or password.'
        res.status(401).json({ message: error.message })
    }
}

/*****************************************************************
 * Function: registerUser
 *
 * Function for registering an user.
 * Returns: 
 *  if successful: register user into the database., 201
 *  else: 401
 *****************************************************************/
export const registerUser = async(req, res) => {
    const user = JSON.parse(req.params.info);
    try{
        // checks if email and username already exists
        if ((await User.findOne({email: user.email})) || (await User.findOne({userName: user.userName})))
            throw new Error()
        await (new User(user)).save()
        res.status(201).json({message: "successful registration"})
    } catch(error){
        error.message = 'Email already exists.'
        res.status(401).json({ message: error.message })
    }
}