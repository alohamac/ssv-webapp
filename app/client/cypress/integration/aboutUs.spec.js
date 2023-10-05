/*
Tests for UI elements on the About Us
Written using Cypress testing framework
*/

describe("renders the About Us page", () => {
  it("Visit About Us page", () => {
    cy.visit("/aboutUs");
  });

  it("Render UI elements", () => {
    cy.get("h1").contains("About Us");

    cy.get("#aboutUs-row-1").get("h2").contains("What We Do");

    cy.get('#aboutUs-col-1').get("h2").contains("Our Mission");

    cy.get('#partner-col-left').get("h2").contains("Company A");

    cy.get('#partner-col-right2')
      .find("p")
      .should(
        "contain",
        "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do "
      );
  });
});
