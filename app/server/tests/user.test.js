import User from "../models/user"
import supertest from "supertest"
import dbHandler from "./db-handler"
import express from "express"
import userRoutes from "../routes/user"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

beforeAll(async () => dbHandler.connect())
beforeEach(async () => {
    var user = {
        firstName: "John",
        lastName: "Doe",
        userName: "Doe123",
        email: "johndoe@gmail.com",
        phoneNumber: "8084543928",
        password: "abc123",
    }
    
    await (new User(user)).save()
})
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

app.use("/user", userRoutes)

describe("testing employee routes", ()=>{
    it ("POST /register", async() =>{
        var user = {
            firstName: "Foo",
            lastName: "Bar",
            userName: "bar123",
            email: "foobar@gmail.com",
            phoneNumber: "123123123",
            password: "abc123",
        }
        const {body} = await supertest(app).post("/user/register/"+ JSON.stringify(user)).expect(201)
        expect(body.message).toBe('successful registration')
    })
    it ("GET /login", async() =>{
        //invalid login
        await supertest(app).get("/user/login/Doe123/xddd").expect(401)

        //valid login
        const {text} = await supertest(app).get("/user/login/Doe123/abc123").expect(200)
        var {user} = JSON.parse(text)
        expect(user.username).toBe('Doe123')
    })
})