/*
Tests for UI elements on the homepage
Written using Cypress testing framework
*/

describe("Renders the Home page", () => {
  it("Visit Home page", () => {
    cy.visit("/");
  });

  it("Render UI elements", () => {
    cy.get("h2").contains("Starlight Sonata Ventures");
    cy.get("h3").contains("This is a brief introduction about SSV.");
    cy.get('#image').find("img").should("be.visible");
  });
});
