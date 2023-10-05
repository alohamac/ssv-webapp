/***************************************************
 * File: index.js
 *
 * This file creates the connection the remote server.
 */

import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

mongoose.connect(
    process.env.SSV_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
    })
})