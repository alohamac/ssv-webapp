import Employee from "../models/employee"
import supertest from "supertest"
import dbHandler from "./db-handler"
import express from "express"
import employeeRoutes from "../routes/employee"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import e from "express"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var employee

beforeAll(async () => dbHandler.connect())
beforeEach(async () => {
    employee = {
        employeeID: "1",
        firstName: "John",
        lastName: "Doe",
        userName: "Doe123",
        email: "johndoe@gmail.com",
        phoneNumber: "8084543928",
        password: "abc123",
        secret: "ORYSY5SVPM3UIUS3JB5UMY2KKJMEQ7KWGRMHS3LJMMYTU5T2KIXA",
        registrationVerified: true
    }
    
    await (new Employee(employee)).save()
})
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

app.use("/employees", employeeRoutes)

describe("testing employee routes", () => {
    it ("GET /login", async () => {
        // invalid username
       await supertest(app).get("/employees/login/John808/abc123").expect(401)

        // valid password
        const validPass = await supertest(app).get("/employees/login/Doe123/abc123").expect(201)
        expect(validPass.text).toBe("{\"message\":true}")
        // invalid 
        await supertest(app).get("/employees/login/Doe123/xyz456").expect(401)
    })
    it ("GET /login/verify", async () => {
        const response = (await supertest(app).get("/employees/login/verify/Doe123/957839"))
    })
})

describe("testing employee register routes", ()=>{
    it ("POST /register", async() =>{
        employee = {
            firstName: "Foo",
            lastName: "Bar",
            userName: "bar123",
            email: "foobar@gmail.com",
            phoneNumber: "123123123",
            password: "abc123",
        }
        await supertest(app).post("/employees/register/"+ JSON.stringify(employee)).expect(201)
        var {lastName} = await Employee.findOne({userName: 'bar123'})
        expect(lastName).toBe('Bar')
    })

    // route for getting all pending registrations.
    it ("GET /register/pending", async ()=>{
        const employee = {
            firstName: "Foo",
            lastName: "Bar",
            userName: "bar123",
            email: "foobar@gmail.com",
            phoneNumber: "123123123",
            password: "abc123",
        }
        await (new Employee(employee)).save()
        const {body}=await supertest(app).get("/employees/register/pending/").expect(201)
        expect(body.data[0].firstName).toBe(employee.firstName)
    })

    it ("PATCH /approve/registration", async ()=>{
        const employee = {
            employeeID: "2",
            firstName: "Foo",
            lastName: "Bar",
            userName: "bar123",
            email: "foobar@gmail.com",
            phoneNumber: "123123123",
            password: "abc123",
        }
        await (new Employee(employee)).save()
        await supertest(app).patch("/employees/register/approve/2").expect(201)
        const {body}=await supertest(app).get("/employees/register/pending/").expect(201)
        var {registrationVerified} = await Employee.findOne({userName: 'bar123'})
        expect(registrationVerified).toBe(true)
    })

    it ("DELETE /delete", async ()=>{
        var {lastName} = await Employee.findOne({userName: 'Doe123'})
        expect(lastName).toBe('Doe')     

        await supertest(app).delete("/employees/delete/1").expect(201)
        var employee = await Employee.findOne({userName: 'Doe123'})
        expect(employee).toBe(null)
    })
})