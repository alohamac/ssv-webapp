/*****************************************************************
 * File: test_servicesOffered.spec.js
 *
 * This file contains unit tests for the Services Offered page
 * We will test:
 * - UI elements appear as intended
 *****************************************************************/

const header = "Services Offered";
const link = "/servicesOffered";
const serviceOneName = "Service Name goes here";
const serviceOneText =
  "This is a description for the service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";
const serviceOneFor = "Who is this service for?";
const serviceOneForText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.";

/****************************************************************
 * Tests specific to UI elements rendering on Services Offered
 * **************************************************************/
describe("UI Elements Render", () => {
  it("page renders", () => {
    cy.visit(link).get("#servicesOfferedPage").should("be.visible");
  });

  it("page header is correct", () => {
    cy.visit(link).get("#servicesOfferedHeader").contains(header);
  });

  it("service name is correct", () => {
    cy.visit(link).get("#serviceName").contains(serviceOneName);
  });

  it("Service Text", () => {
    cy.visit(link).get("#serviceText").contains(serviceOneText);
  });

  it("Service For", () => {
    cy.visit(link).get("#serviceFor").contains(serviceOneFor);
  });

  it("Service For Text", () => {
    cy.visit(link).get("#serviceForText").contains(serviceOneForText);
  });

  it("Image", () => {
    cy.visit(link).get("#serviceImg").should("be.visible");
  });
});
