/***************************
 * File: test_discussionBoard.spec.js
 *
 * File contains unit tests pertaining to the discussion board
 * interactions from:
 * - Customer POV
 * - Employee POV
 *
 * Tests for:
 * - Correct ticket number
 * - Correct status
 * - Correctly renders the ticket status page
 * - Renders the ticket-specific subsection
 * - Renders the Discussion-specific subsection
 * - Renders the chat box
 */

import { nanoid } from "nanoid"; //Used to create random strings

/**************************************************
 * Employee UI Testing
 *************************************************/
const empTicketNumber = "MV0TZHROUU";
const empTicketDescr = "asdasd";
const empTicketName = "Marcus Sagisi";
const empTicketCompany = "SSV";
const empTicketEmail = "sagisimarcus@gmail.com";
const empTicketPhone = "8084543928";
const empTicketZip = "96818";
const empTicketStatus = "Not Started";

/********************************************
 * Tests specific to the Discussion Board
 * functionality from the EMPLOYEE POV
 ********************************************/
describe("Testing (Employee) DiscussionBoard Functionality", () => {
  it("renders correct page", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/");

    //Iterate through table elements
    cy.url()
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        //Iterate across the table
        const ticketNum = $e1.text();

        //Break when we've found desired ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion
          cy.get("#ticketUpdateView").should("be.visible");
        }
      });
  });

  //Ensures the ticket-specific section renders
  it("renders ticket-specific sub section", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        //Iterate across the table
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion
          cy.get("#ticketViewTicketDetails").should("be.visible");
        }
      });
  });

  //Ensures the discussion board section renders
  it("renders container for discussion board", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        //Iterate across the table
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion
          cy.get("#ticketViewDiscussionBoard").should("be.visible");
        }
      });
  });

  // Ensure correct customer
  it("displays correct customer", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion
          cy.get("#ticketViewCustomerName").contains(empTicketName);
          cy.get("#ticketViewCompany").contains(empTicketCompany);
          cy.get("#ticketViewEmail").contains(empTicketEmail);
          cy.get("#ticketViewPhone").contains(empTicketPhone);
          cy.get("#ticketViewZip").contains(empTicketZip);
          cy.get("#ticketViewDescr").contains(empTicketDescr);
        }
      });
  });

  //Ensure correct ticket number
  it("displays correct ticket number", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion

          cy.get("#ticketViewTicketNum").contains(empTicketNumber);
        }
      });
  });

  //Ensure correct ticket status
  it("displays correct ticket status", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion

          cy.get("#ticketViewTicketStatus").contains(empTicketStatus);
        }
      });
  });

  //Ensures description is accurate
  it("renders correct description", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion

          cy.get("#ticketViewDescr").contains(empTicketDescr);
        }
      });
  });

  // Ensures comment box renders
  it("displays the comment box", () => {
    // Bypasses the need to authenticate
    cy.intercept(
      {
        method: "GET",
        url: "/checkToken",
      },
      { statusCode: 200 }
    );

    //Navigate to employeeConsole
    cy.visit("/employeeConsole/")

      //Iterate across table elements
      .get("tr td:nth-child(2)")
      .each(($e1, index, $list) => {
        const ticketNum = $e1.text();

        //Break when we've found correct ticket number
        if (ticketNum.includes(empTicketNumber)) {
          //Navigate to client ticket status view
          cy.get("td:nth-child(1)").eq(index).click();

          //Make assertion

          cy.get("#ticketViewChatBox").should("be.visible");
        }
      });
  });

  /* End Describe */
});

/********************************************
 * Tests specific to the Discussion Board
 * functionality from the CUSTOMER POV
 ********************************************/

const custEmail = "sagisimarcus@gmail.com";
const custTicketNum = "MV0TZHROUU";
const custTicketDescr = "asdasd";
const custTicketStatus = "Not Started";

describe("Testing (Customer) Discussion Board Functionality", () => {
  it("renders correct page", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketStatusPage").should("be.visible");
  });

  it("renders ticket-specific sub section", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewTicketDetails").should("be.visible");
  });

  it("renders container for discussion board", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewDiscussionBoard").should("be.visible");
  });

  it("displays correct ticket number", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewTicketNum").contains(custTicketNum);
  });

  it("displays correct ticket status", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewTicketStatus").contains(custTicketStatus);
  });

  it("renders correct description", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewDescription").contains(custTicketDescr);
  });

  it("displays the comment box", () => {
    //Navigate to customer discussion board UI
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Perform Assertion
    cy.get("#ticketViewChatBox").should("be.visible");
  });

  /* End Describe */
});

/********************************************
 * Tests related to the comment functionality
 ********************************************/
describe("Testing Comment Functionality", () => {
  it("submit comment should render the new comment", () => {
    // Navigate to discussion board
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    // Create comment, submit
    const comment = "Test Comment " + nanoid();
    cy.get("#ticketViewTextArea").type(comment);
    cy.get("#submitComment").click();

    // Make assertion
    cy.contains(comment);
  });

  it("testing against non-existent comment", () => {
    // Navigate to discussion board
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    //Phony comment
    const comment = "Test Comment " + nanoid();

    //Make assertion
    cy.contains(comment).should("not.exist");
  });

  it("cancelling comment should not render the new comment", () => {
    // Navigate to discussion board
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    //Creates comment and cancels
    const comment = "Test Comment " + nanoid();
    cy.get("#ticketViewTextArea").type(comment).get("#cancelComment").click();

    //Make assertion
    cy.contains(comment).should("not.exist");
  });

  it("cancelling comment should clear textbox", () => {
    // Navigate to discussion board
    cy.visit("/contactUs/")
      .get("#statusEmail")
      .type(custEmail)
      .get("#requestNumber")
      .type(custTicketNum)
      .get("#statusSubmit")
      .click();

    //Creates comment and cancels
    const comment = "Test Comment " + nanoid();
    cy.get("#ticketViewTextArea").type(comment).get("#cancelComment").click();

    //Make assertion
    cy.get("#ticketViewTextArea").contains(comment).should("not.exist");
  });

  // End Describe
});
