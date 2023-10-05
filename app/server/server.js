/***************************************************
 * File: routes/server.js
 *
 * This file sets up the routes.
 */
import express from "express";
import cors from "cors";
import tickets from "./routes/tickets.js";
import employees from "./routes/employee.js";
import user from "./routes/user.js"
import discussionBoard from "./routes/discussionBoard.js";
import comment from "./routes/comment.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import withAuth from "./controllers/middleware.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use("/tickets", tickets);
app.use("/employees", employees);
app.use("/discussionBoard", discussionBoard);
app.use("/comment", comment);
app.use("/user", user)

app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});
export default app;
