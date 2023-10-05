describe("Rendering the employee register page", ()=>{
    it("renders correctly", ()=>{
        cy.visit("/userRegistration")
        cy.get('#form')
    })
    it("register form validates", ()=>{
        cy.get('input:invalid').should('have.length', 6)

        cy.get('#firstName').type("John")
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test@test.edu')
        cy.get('#phoneNumber').type('123456789')
        cy.get('#username').type('test123')
        cy.get('#password').type('abc123')
    })

    it("submits the form", ()=>{
        const employee={
            firstName: 'John',
            lastName: 'Test',
            userName: 'test123',
            email: 'test@test.edu',
            phoneNumber: '123456789',
            password:'abc123'
        }

        cy.intercept({
            method: 'POST',
            url: '/user/register/%7B%22firstName%22:%22John%22,%22lastName%22:%22Test%22,%22userName%22:%22test123%22,%22email%22:%22test@test.edu%22,%22phoneNumber%22:%22123456789%22,%22password%22:%22abc123%22%7D',
        },
        {"token": "asdasdasdasdas"})

        cy.get('#submit').click()
        cy.contains('Registration Complete')
    })
})