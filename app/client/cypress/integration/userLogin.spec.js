describe("renders the 'employee login' page", () => {
    it("renders correctly", ()=>{
        cy.visit("/userLogin")
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
        cy.get('#submit').click()
        cy.contains('Invalid login credentials')

        cy.intercept({
            method: 'GET',
            url: '/user/login/Doe123/abc124'
        },
        {"user": {"username": "Doe123"}, "token": "xyz"})
        cy.intercept(
            {
                method: 'GET', 
                url: '/checkToken?token=xyz'
            },
            {statusCode: 200}
        )
        cy.get('#password').clear().type('abc124')
        cy.get('#submit').click()


        cy.url().should("include", "/userConsole");
    })
})