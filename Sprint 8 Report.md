# Sprint 8 Report (4/02/2022 - 5/02/2022)

## What's New (User Facing)

- Tests for the following:
  - Front-end:
    - employee login/registration
    - user login/registration
    - rendering the pending registrations
    - Discussion Board
    - Updated navbar
    - Updated tests for Services Offered UI
    - Contact Us
    - About Us
    - Home 
  - Back-end:
    - employee/user login
    - employee/user registration
    - employee 2FA
    - employee pending registration
- Comments

## Work Summary (Developer Facing)

For this sprint we wanted to focus on creating or updating tests to make sure everything is working as intended as we are completing this project. Additionally, we wanted to make sure we added comments for important features to improve code readability and assist the next team that is working on this. We have decided to not implement the user's account view of a discussion board due to time constraints. This feature is important so we do not want to create a faulty implementation.

There was an oversight while creating the test suite for the discussion board. Tests were not properly stubbed and thus do not show correct results through the CI/CD pipeline. Unfortunately I did not have time to fix this before the deadline.

## Completed Issues/User Stories

Here are links to the issues that we completed in this sprint:

- [Create front-end employee/login tests](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/71)
- [Create front-end user login/register tests](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/72)
- [Create tests for discussion board](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/74)
- [Create backend tests for employee/user login/registtration](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/73)

## Incomplete Issues/User Stories
Here are the isses that we have not been able to complete:
- Spam protection (reCaptcha) testing
- Ticket table view (in admin/mod console) testing

## Code Files for Review

Please review the following code files, which were actively developed during this sprint, for quality:

### Front-end

- [employeeLogin.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/client/cypress/integration/employeeLogin.spec.js)
- [register.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/client/cypress/integration/register.spec.js)
- [userLogin.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/client/cypress/integration/userLogin.spec.js)
- [userRegistration.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/client/cypress/integration/userRegistration.spec.js)
- [UI fix and documentation](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/tree/fixes-comments)
- [test_discussionBoard.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/tests_discussionBoard/app/client/cypress/integration/test_discussionBoard.spec.js)
- [test_navbar.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/tests_discussionBoard/app/client/cypress/integration/test_navbar.spec.js)
- [test_servicesOffered.spec.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/tests_discussionBoard/app/client/cypress/integration/test_servicesOffered.spec.js)

### Back-end

- [employee.test.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/server/tests/employee.test.js)
- [user.test.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone8/app/server/tests/user.test.js)

## Retrospective Summary

Here's what went well:

Here's what we'd like to improve:

Here are the tasks that need to be worked on:


- Finish discussion board implementation for the user schema
- Properly stub the tests for Discussion Board
- Update app to be in compliance with section 508 accessibility standards
- Fix quality of life bugs
- Admins/Mods ability to change texts and images on the website
- Accessibility standards
