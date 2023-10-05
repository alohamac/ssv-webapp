/************************************************************
 * File: controllers/employees.js
 *
 * This file will contain the controllers responsible for
 * performing CRUD operations related to employees
 *
 * Current CRUD ops:
 *  - Get all employees
 *  - Login employees
 *  - Register employees
 *  - Delete employees
 *  - Get pending registrations
 *  - Verify employee login
 */

import Employee from "../models/employee.js";
import jwt from "jsonwebtoken"
import speakeasy from "speakeasy"
import { ObjectId } from "mongodb";

/*****************************************************************
 * Function: getAllEmployees
 *
 * Function for getting all the employees.
 * Returns: 
 *  if successful: all employees
 *  else: error
 *****************************************************************/
export const getAllEmployees = async (req, res) => {
    try {
        var employee = await Employee.find();
        res.status(200).json(employee)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

/*****************************************************************
 * Function: loginEmployee
 *
 * Function for logging in an employee.
 * Returns: 
 *  if successful: 201
 *  else: 401
 *****************************************************************/
export const loginEmployee = async (req, res) => {
    const info = req.params;
    try {
        const employee = await Employee.findOne({ userName: info.username })
        const isMatch = await employee.validatePassword(info.password)
        if (!isMatch || !employee.registrationVerified)
            throw new Error('Invalid username or password.')
        res.status(201).json({message: isMatch})
    } catch (error) {
        error.message = 'Invalid username or password.'
        res.status(401).json({ message: error.message })
    }
}

/*****************************************************************
 * Function: registerEmployee
 *
 * Function for registering in a new employee.
 * Returns: 
 *  if successful: saves new employee into database and returns 2fa key
 *  else: 401
 *****************************************************************/
export const registerEmployee = async(req, res) => {
    const employee = JSON.parse(req.params.info);
    try{
        // checks if email and username already exists
        if ((await Employee.findOne({email: employee.email})) || (await Employee.findOne({userName: employee.userName})))
            throw new Error()
        employee.secret = speakeasy.generateSecret().base32
        await (new Employee(employee)).save()
        res.status(201).json({secret: employee.secret})
    } catch(error){
        error.message = 'Email already exists.'
        res.status(401).json({ message: error.message })
    }
}

/*****************************************************************
 * Function: deleteEmployee
 *
 * Function for deleting an employee from the database.
 * Returns: 
 *  if successful: Deletes employee from database.
 *  else: error
 *****************************************************************/
export const deleteEmployee = async (req, res)=>{
    const employeeID = req.params.employeeID
    try{
        await Employee.deleteOne({employeeID: employeeID})
        res.status(201).json()
    } catch(error){
        res.status(401).json()
    }
}

/*****************************************************************
 * Function: getPendingRegistrations
 *
 * Function getting all pending registrations.
 * Returns: 
 *  if successful: returns pending registrations with the appropriate data.
 *  else: error
 *****************************************************************/
export const getPendingRegisrations = async (req, res) => {
    try{
        const list=await Employee.find({registrationVerified: false},{
            _id: 0, 
            employeeID: 1,
            firstName: 1, 
            lastName: 1, 
            email: 1, 
            phoneNumber: 1, 
            userName:1,
        })
        res.status(201).json({data: list})
    }
    catch{
        res.status(404).json()
    }
}

/*****************************************************************
 * Function: approveEmployeeRegistration
 *
 * Function for approving employee registration.
 * Returns: 
 *  if successful: finds the corresponding registratration and change
 *                 treir verification to true.
 *  else: 404
 *****************************************************************/
export const approveEmployeeRegistration = async (req, res)=>{
    const employeeID = req.params.employeeID
    try{
        await Employee.updateOne({employeeID: employeeID}, {registrationVerified:true})
        res.status(201).json()
    }catch{
        res.status(404).json()
    }
}

/*****************************************************************
 * Function: verifyEmployeeLogin
 *
 * Function for verifying an employees login.
 * Returns: 
 *  if successful: returs a token for the frontend to save and 
 *                 verify if they are logged in.
 *  else: 401
 *****************************************************************/
export const verifyEmployeeLogin = async (req, res) => {
    const info = req.params;
    
    try {
        const employee = await Employee.findOne({ userName: info.username })
        const isMatch = speakeasy.totp.verify({
            secret: employee.secret,
            encoding: "base32",
            token: info.verificationCode
        })
        if (!isMatch)
            throw Error
        const token = jwt.sign(employee.userName, "key")
        jwt.sign({
            username: employee.userName
        }, 'key', (err, token) => {
            if (err) {throw err;}
            res.json({
                token,
                employee: {
                    username: employee.userName,
                    role: employee.role
                }
            });
        });
    } catch (error) {
        error.message = 'Invalid verification code.'
        res.status(401).json({ message: error.message })
    }
}