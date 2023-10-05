/*****************************************************************
 * File: test_navbar.spec.js
 *
 * This file contains the unit tests for NavBar functionality.
 * We test:
 * - The navbar renders in all UI states
 * - The navbar links work for all
 *****************************************************************/

const companyName = "Starlight Sonata Ventures";
const secondaryBgColor = "rgb(229, 229, 229)";

/********************************************
 * Tests specific to rendering the navbar
 ********************************************/
describe("Navbar Renders", () => {
  it("Navbar renders", () => {
    cy.visit("/").get("#navbar").should("exist");
  });
});

/********************************************
 * Tests specific to the links within the navbar
 ********************************************/
describe("Navbar Links Work", () => {
  it("About Us", () => {
    cy.visit("/");
    cy.get("#aboutUsBtn").click().url().should("include", "/aboutUs");
  });

  it("Contact Us", () => {
    cy.visit("/");
    cy.get("#contactUsBtn").click().url().should("include", "/contactUs");
  });

  it("Services Offered", () => {
    cy.visit("/");
    cy.get("#servicesOfferedBtn")
      .click()
      .url()
      .should("include", "/servicesOffered");
  });

  it("Logo", () => {
    cy.visit("/");
    cy.get("#logoBtn").click().url().should("include", "/");
  });
});

/********************************************
 * Tests specific to UI elements within the navbar
 ********************************************/
describe("UI Elements Appear", () => {
  it("Logo", () => {
    cy.visit("/").get("#logoBtn").should("be.visible");
  });

  it("Company name", () => {
    cy.visit("/").get("#appTitle").contains(companyName);
  });

  it("About Us", () => {
    cy.visit("/").get("#aboutUsBtn").contains("About Us");
  });

  it("Contact Us", () => {
    cy.visit("/").get("#contactUsBtn").contains("Contact Us");
  });

  it("Services Offered", () => {
    cy.visit("/").get("#servicesOfferedBtn").contains("Services Offered");
  });

  it("Background Color", () => {
    cy.visit("/")
      .get("#navbar")
      .should("have.css", "background-color")
      .and("eq", secondaryBgColor);
  });
});
