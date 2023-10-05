/************************************************************
 * File: controllers/middleware.js
 *
 * This file contains the middleware to verify if a person
 * is logged in and verifying if they have the appropriate role
 * 
 *
 * Current CRUD ops:
 *  - Authenticates current user.
 */

import jwt from "jsonwebtoken"

const withAuth = function (req, res, next) {
  const token = req.query.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, "key", function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.userName = decoded.userName;
        next();
      }
    });
  }
}

export default withAuth