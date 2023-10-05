describe("renders the 'employee login' page", () => {
    it("renders correctly", ()=>{
        cy.visit("/employeeLogin")
        cy.get('#login-form')
    })
    it ("login form validates", () => {
        cy.get('#login-form').within(()=>{
            cy.get('input:invalid').should('have.length', 2)

            cy.get('#username').type("Doe123")
            cy.get('#password').type("abc124")
        })
    })

    it("sumbits the form", ()=> {
        cy.intercept({
            method: 'GET',
            url: '/employees/login/Doe123/abc123'
        },
        {"employee": {"username": "Doe123"}, "token": "xyz"})
        
        cy.get('#submit').click()
        cy.contains('Invalid login credentials')

        cy.get('#password').clear().type('abc123')
        cy.get('#submit').click()

    })
    it ("verifies login", () =>{
        cy.contains('Verification Code')

        cy.intercept({
            method: 'GET',
            url: '/employees/login/verify/Doe123/111111'
        },
        {"employee": {"username": "Doe123", "role": "mod"}, "token": "xyz"})
        cy.intercept(
            {
                method: 'GET', 
                url: '/checkToken?token=xyz'
            },
            {statusCode: 200}
        )
        cy.get('#verify').type('000000').click()
        cy.contains('Invalid Verification Code')
        cy.get('#verification').clear().type('111111')
        cy.get('#verify').click()

        cy.url().should("include", "/employeeConsole");
    })
})