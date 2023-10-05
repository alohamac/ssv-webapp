import SupportTicket from "../models/supportTicket"
import supertest from "supertest"
import dbHandler from "./db-handler"
import express from "express"
import ticketRoutes from "../routes/tickets"
import bodyParser from "body-parser"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/tickets", ticketRoutes)

beforeAll(async () => await dbHandler.connect())
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe("testing ticket routes", () => {
  it ("POST /tickets", async () => {
    const ticket = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phoneNumber: "1234567890",
      company: "SSV",
      zipcode: 99163,
      requestDescription: "Lorem Ipsum",
    }
    const {body} = await supertest(app).post("/tickets").send(ticket).expect(201)
    const ticketID = body.ticketID // saves the response

    // manually gets the new ticket
    const newTicket = (await SupportTicket.find())[0]

    expect(newTicket.firstName).toBe(ticket.firstName)
    expect(newTicket.lastName).toBe(ticket.lastName)
    expect(newTicket.email).toBe(ticket.email)
    expect(newTicket.phoneNumber).toBe(ticket.phoneNumber)
    expect(newTicket.company).toBe(ticket.company)
    expect(newTicket.zipcode).toBe(ticket.zipcode)
    expect(newTicket.requestDescription).toBe(ticket.requestDescription)
    expect(newTicket.ticketID).toBe(ticketID)
    expect(newTicket.status).toBe('Not Started')
  })

  it ("GET /tickets/:id/:email", async () => {
    const ticket = {
      ticketID: "ABC123",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phoneNumber: "1234567890",
      company: "SSV",
      zipcode: 99163,
      requestDescription: "Lorem Ipsum",
    }
    await (new SupportTicket(ticket)).save()
    
    const status = (await supertest(app).get("/tickets/ABC123/johndoe@gmail.com").expect(200)).body
    expect(status.ticketID).toBe(ticket.ticketID)
    expect(status.requestDescription).toBe(ticket.requestDescription)
    expect(status.status).toBe("Not Started")

    // invalid credentials
    await supertest(app).get("/tickets/ZASTASD/johndoe@gmail.com").expect(404)
    await supertest(app).get("/tickets/ABC123/foo@bar.com").expect(404)
  })

  it ("PUT /:id/:status", async () => {
    const ticket = {
      ticketID: "ABC123",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phoneNumber: "1234567890",
      company: "SSV",
      zipcode: 99163,
      requestDescription: "Lorem Ipsum",
    }
    await (new SupportTicket(ticket)).save()


    const beforeTicket = await SupportTicket.findOne({ticketID: ticket.ticketID})
    expect(beforeTicket.status).toBe("Not Started")
    const status = (await supertest(app).put("/tickets/ABC123/In Progress").expect(201)).body
    const afterTicket = await SupportTicket.findOne({ticketID: ticket.ticketID})
    expect(afterTicket.status).toBe("In Progress")
  })
})
