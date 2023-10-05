/***************************************************
 * File: routes/employee.js
 *
 * This file holds routes regarding the user controllers
 */
import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";

const router = express.Router()

router.post('/register/:info', registerUser)
router.get('/login/:username/:password', loginUser)

export default router