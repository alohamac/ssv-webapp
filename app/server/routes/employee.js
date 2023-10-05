/***************************************************
 * File: routes/employee.js
 *
 * This file holds routes regarding the employee controllers
 */

import express from "express"
import { approveEmployeeRegistration, deleteEmployee, getAllEmployees, getPendingRegisrations, loginEmployee, registerEmployee, verifyEmployeeLogin } from "../controllers/employees.js"

const router = express.Router()

router.get('/', getAllEmployees)
router.get('/login/:username/:password', loginEmployee)
router.get('/login/verify/:username/:verificationCode', verifyEmployeeLogin)
router.delete('/delete/:employeeID', deleteEmployee)
router.post('/register/:info', registerEmployee)
router.get('/register/pending', getPendingRegisrations)
router.patch('/register/approve/:employeeID', approveEmployeeRegistration)
export default router