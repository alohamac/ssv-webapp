describe("renders the 'contact us' page", ()=>{
    it("renders correctly", ()=>{
        cy.visit("/contactUs")
        cy.get('#ticket-form')
        cy.get('#status-form')
    })
    it ("ticket and status form validates", () => {
        cy.get('#ticket-form').within(()=> {
            // since the form has not been filled in, this checks how many invalid inputs there are
            cy.get('input:invalid').should('have.length', 6)
            cy.get('textarea:invalid').should('have.length', 1)

            // filling in form
            cy.get('#firstName').type('John')
            cy.get('#lastName').type('Doe')
            cy.get('#ticketEmail').type('johndoegmail.com')
            cy.get('#phoneNumber').type('1234567890')
            cy.get('#company').type('SSV')
            cy.get('#zipcode').type('96818')
            cy.get('#requestDescription').type('Lorem ipsum dolor sit amet.')
            
            cy.get('input:invalid').should('have.length', 1) // email is invalid
            cy.get('#ticketEmail').clear().type('johndoe@gmail.com')
            cy.get('input:invalid').should('have.length', 0)
        })

        cy.get("#status-form").within(() => {
            cy.get('input:invalid').should('have.length', 2)
            cy.get('#statusEmail').type('johndoe@gmail.com')
            cy.get('#requestNumber').type('AAAAAAAAA')
            cy.get('input:invalid').should('have.length', 0)
        })
    })

    it("submits a ticket", () => {
        // stubs post request
        cy.intercept(
            {
                method: 'POST',
                url: '/tickets',
            },
            {"ticketID":"ABC123"}
        ).as('createTicket')
    })
    
    it ("retrieves a ticket", () => {

        // stubs an unsuccessful ticket retrieval
        cy.intercept(
            {
                method: 'GET',
                url: '/tickets/AAAAAA/johndoe@gmail.com',
            },
            {statusCode: 404},
        ).as('retreived ticket')

        // stubs a successful ticket retrieval
        cy.intercept(
            {
                method: 'GET',
                url: '/tickets/ABC123/johndoe@gmail.com',
            },
            {"ticketID": "ABC123", "status": "not started", "requestDescription": "Lorem ipsum dolor sit amet."},
        ).as('retreived ticket')
        cy.reload()

        // retrieve invalid ticket
        cy.get('#statusEmail').type('johndoe@gmail.com')
        cy.get('#requestNumber').type('AAAAAA')
        cy.get('#statusSubmit').click()
        cy.contains('Invalid ticket credentials. Please try again.')

        // retrieve valid ticket
        cy.get('#requestNumber').clear().type('ABC123')
        cy.get('#statusSubmit').click()
        cy.contains("Request number: #ABC123")
        cy.contains("not started")
        cy.contains("Lorem ipsum dolor sit amet.")
    })
})