# Sprint 6 Report (2/03/2022 - 3/02/2022)

## What's New (User Facing)

- Admin can now view/modify ticket status'
- Admin and Clients may now exchange (submit/view) comments via a discusison board style interface.
- Admins/Mods now have a registration page, see and accept a sign-up request from others
- Recaptcha bug is fixed (contactUs page will not refresh when the user forget to complete the captcha task)
- Employee console ui is fixed (all missing icons are added)

## Work Summary (Developer Facing)

The biggest problem we had for this sprint was to create a chatbox between the customer and the staffs. We held some internal meetings and raised many questions, including:
- Definition of "live chat": An actual chat box vs a Discussion Board style form of communication
- How instantaneous the Admin response is relative to the client
    - Does the client have to refresh the page?  (Adds more work for the client, as they will have to add credentials again)
    - Does the Admin response show immediately without refresh?   (Somewhat more difficult, as we need to trigger a component refresh, but keeping flags to allow them to view the status page) 
- Do we allow Clients to add to the conversation?
    - If yes: Might need to restructure the ticketStatus page to reflect this.
- Do we want metadata in our (admin) response? What kind?
- In the 'ticketStatus' view, regarding the Admin response, do we want a box already present? Or do we want the box to appear when there is a response to see?
    - Just had a thought, we should print something letting the client know that "we are working on a response" 

We decided to schedule a meeting with our mentor to clarify these questions. After the meeting, we decided to create a new discussion schema to store the conversation between customers and admins/mods in a discussion-board style form rather than an actual chat box.

In addition, we fixed some bugs from the last two sprints. One of them is when the user forget to complete captcha input, the contactUs page will be refreshed and the user will need to re-enter all their information. By default, if the user doesn't complete the required task, the page will get refreshed, causing this bug. The way to fix this was to prevent default refresh after checking if the required captcha is filled. Anther bug was a UI bug in the ticket table on the employee console. We found out that the bug came from not importing material-table icons correctly. For some reasons, running 'npm install @material-ui/icons --save' and importing the library did not work on Mac. We ended up having to import the icon font via html. Neither of these bugs were very challenging to fix, but they were hard to find and we needed to read lots of documentation to find the root cause.

We have added a registration feature for the employees. Once registered, the newly registered account needs to be approved by an admin first before being able to login. The admins can view all pending registrations and approve or delete registrations if appropriate. 

## Unfinished Work

- Updating mobileUI


## Completed Issues/User Stories

Here are links to the issues that we completed in this sprint:

- [Admin response to a ticket Frontend](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/43)
- [Admin response to a ticket Backend](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/45)
- [Client response to a ticket](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/48)
- [Missing Icons bug](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/40)
- [Recaptcha refresh bug](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/41)
- [Employee registration page](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/issues/44)

## Incomplete Issues/User Stories

Here are links to issues we worked on but did not complete in this sprint:



## Code Files for Review

Please review the following code files, which were actively developed during this sprint, for quality:

#### Front-End
- [ticketUpdateView.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/ticketUpdateView.js)
- [clientTicketStatusView.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/commentTable.js)
- [comment.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/comment.js)
- [commentTable.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/commentTable.js)
- [employeeConsole.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/employeeConsole.js)
- [ticketList.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/fixBugs/app/client/src/components/ticketList.js)
- [contactUs.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/fixBugs/app/client/src/components/contactUs.js)
- [registerForm.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/registration/app/client/src/components/registerForm.js)
- [viewPendingEmployees.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/registration/app/client/src/components/viewPendingEmployees.js)
- [employeeLogin.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/registration/app/client/src/components/employeeLogin.js)
    
#### Back-End Controllers
- [controllers/tickets.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/server/controllers/tickets.js)
- [controllers/comment.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/server/controllers/comment.js)
- [controllers/discussionBoard.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/server/controllers/discussionBoard.js)

#### Back-End Models
- [models/comment.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/server/models/comment.js)
- [models/discussionBoard.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/server/models/discussionBoard.js)
- [employee.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/registration/app/server/models/employee.js)

#### Removed/Changed
- [ticketStatus-REMOVED.js](https://github.com/WSUCptSCapstone-Fall2021Spring2022/ssv-webapp/blob/milestone6/app/client/src/components/ticketStatus-REMOVED.js)

## Retrospective Summary

Here's what went well:

- Time management
- Communication between the team and our mentor
- Communication among team members

Here's what we'd like to improve:
- Task distribution

Here are changes we plan to implement in the next sprint:
- Testing
- Mobile UI
