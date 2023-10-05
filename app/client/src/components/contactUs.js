/********************************
 * File: contactUs.js
 *
 * Refactored for milestone6
 *
 * Removed TicketStatus and added ClientTicketStatusView
 *
 * ContactUs is now the landing point for views related to customers.
 * We use clientConsoleMode.js to render the proper views, such as
 * {Contact Us landing page, Ticket status view, Future additions}.
 */

import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import axios from "axios";
import "../static/style.css";
import RequestReceived from "./requestReceived";
import StatusCheckForm from "./statusCheckForm";
// import TicketStatus from "./ticketStatus";
import ClientTicketStatusView from "./clientTicketStatusView";
import ClientConsoleMode from "./clientConsoleMode";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeZipcode = this.onChangeZipcode.bind(this);
    this.onChangeRequestDecription = this.onChangeRequestDecription.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.saveTicketObj = this.saveTicketObj.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      zipcode: null,
      requestDescription: "",
      isSubmitted: false,
      id: "",
      ticketInfo: null,
      isVerified: false,
      clientConsoleMode: ClientConsoleMode.CONTACT_US_VIEW,
    };
  }

  setMode = (newMode) => {
    this.setState({
      clientConsoleMode: newMode,
    });
  };

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value,
    });
  }

  onChangeZipcode(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  onChangeRequestDecription(e) {
    this.setState({
      requestDescription: e.target.value,
    });
  }

  saveTicketObj(e) {
    console.log("On Change Ticket: " + JSON.stringify(e));
    this.setState({
      ticketInfo: e,
    });
  }

  setClientConsoleMode = (newMode) => {
    this.setState({ clientConsoleMode: newMode });
  };

  recaptchaLoaded() {
    console.log("capcha successfully loaded");
  }

  verifyCallback(e) {
    this.setState({
      isVerified: true,
    });
  }

  /****************************
   * Ticket MUtators
   ****************************/
  updateTicketDiscIdLocal = (newDiscId) => {
    let newObj = this.state.ticketInfo;
    newObj.discId = newDiscId;
    this.setState({
      ticketInfo: newObj,
    });
  };

  async onSubmit(e) {
    if (this.state.isVerified) {
      e.preventDefault();
      const ticket = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        company: this.state.company,
        zipcode: this.state.zipcode,
        requestDescription: this.state.requestDescription,
      };

      await axios.post("http://localhost:5000/tickets", ticket).then(
        (response) => {
          this.setState({ isSubmitted: true, id: response.data.ticketID });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("Please verify that you are a human!");
      e.preventDefault();
    }
  }
  render() {
    switch (this.state.clientConsoleMode) {
      case ClientConsoleMode.CONTACT_US_VIEW:
        if (!this.state.isSubmitted) {
          return (
            // TODO: Admins/Mods ability to change texts and images on the website
            <>
              <h1 className="contactUs-title">Contact Us</h1>
              <div className="left-form">
                <form id="ticket-form" onSubmit={this.onSubmit}>
                  <h1 className="contactUs-text">For Immediate Service</h1>
                  <h1>Call (509) XXX-XXXX or</h1>
                  <h1 className="contactUs-text">
                    Complete this form to request a call back
                  </h1>
                  <br />
                  <div className="form">
                    First Name*
                    <br />
                    <input
                      type="text"
                      id="firstName"
                      className="form-textbox"
                      onChange={this.onChangeFirstName}
                      value={this.state.firstName}
                      required
                    />
                  </div>
                  <div className="form">
                    Last Name*
                    <br />
                    <input
                      type="text"
                      id="lastName"
                      className="form-textbox"
                      value={this.state.lastName}
                      onChange={this.onChangeLastName}
                      required
                    />
                  </div>
                  <br style={{ clear: "both" }} />
                  <div className="form">
                    Email Address*
                    <br />
                    <input
                      type="email"
                      id="ticketEmail"
                      className="form-textbox"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      required
                    />
                  </div>
                  <div className="form">
                    Phone Number*
                    <br />
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-textbox"
                      value={this.state.phoneNumber}
                      onChange={this.onChangePhoneNumber}
                      required
                    />
                  </div>
                  <br style={{ clear: "both" }} />
                  <div className="form">
                    Company*
                    <br />
                    <input
                      type="text"
                      id="company"
                      className="form-textbox"
                      value={this.state.company}
                      onChange={this.onChangeCompany}
                      required
                    />
                  </div>
                  <div className="form">
                    Zipcode*
                    <br />
                    <input
                      type="text"
                      id="zipcode"
                      className="form-textbox"
                      value={this.state.zipcode}
                      onChange={this.onChangeZipcode}
                      required
                    />
                  </div>
                  <br style={{ clear: "both" }} />
                  <div className="form">
                    Tell us how we can help you:
                    <br />
                    <textarea
                      id="requestDescription"
                      className="form-textarea"
                      value={this.state.requestDescription}
                      onChange={this.onChangeRequestDecription}
                      required
                    ></textarea>
                  </div>
                  <br />
                  <input
                    className="submit"
                    id="ticketSubmit"
                    type="submit"
                    value="Submit Request"
                  />
                  <div style={{"display":"flex","placeContent":"center"}}>
                    <Recaptcha
                      sitekey="6LcVkEoeAAAAALZp3ZF-LNb-rmGbE_SZFEIN1FB9"
                      render="explicit"
                      onloadCallback={this.recaptchaLoaded}
                      verifyCallback={this.verifyCallback}
                    />
                  </div>
                </form>
              </div>
              <StatusCheckForm
                saveTicketObj={this.saveTicketObj}
                setClientConsoleMode={this.setClientConsoleMode}
              />
            </>
          );
        } else return <RequestReceived ticketID={this.state.id} />;

      case ClientConsoleMode.TICKET_STATUS_VIEW:
        return (
          <ClientTicketStatusView
            setMode={this.setMode}
            ticketInfo={this.state.ticketInfo}
          />
        );
      default:
        return null;
    }
  }
}
