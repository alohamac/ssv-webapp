# Sprint 7 Report (3/02/2022 - 4/08/2022)

## What's New (User Facing)

- Users are able to register for an account and sign in with their accounts
- Customers who submitted a ticket are able to view a discussion board for that ticket.
- Implented the mobile user interface for the following pages:
  - Landing Page
  - About Us
  - Services Offered
  - Contact Us

## Work Summary (Developer Facing)

The discussion board implemntation was continued with adding the client's view of the discussion board. We also added the user registration and sign-up, but when signed it will only show a blank page and a log out button. This user schema was made so that the admins can add registered users to a ticket's discussion board. Lastly, we implemented the mobile interface of the user client view. We ran into a bug where the styling was not working as intended which caused our work to be delayed. The issue was that there were multiple css files with the same styles, so we deleted the conflicting css files and organized the style.css files.

## Completed Issues/User Stories

Here are links to the issues that we completed in this sprint:

- [User Register/Login](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/65)
- Mobile UI:
  - [Homepage](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/68)
  - [Contact Us](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/66)
  - [About Us](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/67)
- Comment bugs (A shift in architecture cleaned these up as a whole)
  - [When client submits a comment, the browser must be refreshed for comment to appear](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/52)
  - [When admin submits a comment, the browser must be refreshed for comment to appear](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/47)
  - [Submitting two consecutive comments in a fresh DiscussionBoard behaves incorrectly](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/46)
## Code Files for Review

Please review the following code files, which were actively developed during this sprint, for quality:

### Front-end

- [aboutUs.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/aboutUs.js)
- [contactUs.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/contactUs.js)
- [employeeConsole.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/master/app/client/src/components/employeeConsole.js)
- [home.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/home.js)
- [mobileMenu.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/mobileMenu.js)
- [navBar.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/navBar.js)
- [style.css](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/static/style.css)
- [ticketUpdateView.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/master/app/client/src/components/ticketUpdateView.js)
- [userConsole.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/userConsole.js)
- [userLogin.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/userLogin.js)
- [userRegisterForm.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/userRegisterForm.js)

### Back-end

#### Controllers

- [user.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/server/controllers/user.js)

#### models

- [user.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/server/models/user.js)

#### routes

- [user.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/server/routes/user.js)

### Architecture Refactor

- [clientTicketStatusView.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/clientTicketStatusView.js)
- [employeeConsole.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/employeeConsole.js)
- [ticketUpdateView.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/ticketUpdateView.js)
- [ticketList.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone7/app/client/src/components/ticketList.js)

## Retrospective Summary

Here's what went well:

- Task distrubution
- Communication

Here's what we'd like to improve:

- Set up the styles so that it can be easily edited in the feature.

Here are changes we plan to implement in the next sprint:

- Finish discussion board implementation for the user schema
- Complete tests
- Comments
