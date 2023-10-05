/*****************************************************************
 * File: statusCheckForm.js
 *
 * This file holds the object to allow for easy manipulation of
 * status check form.
 *****************************************************************/

import React, { Component } from "react";
import axios from "axios";
import ClientConsoleMode from "./clientConsoleMode";

export default class StatusCheckForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      id: "",
      isRetrieved: false,
      ticket: null,
      isValidInput: true,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeID(e) {
    this.setState({
      id: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const info = {
      email: this.state.email.replace(/\s/g, ""),
      id: this.state.id.replace(/\s/g, ""),
    };
    await axios
      .get("http://localhost:5000/tickets/" + info.id + "/" + info.email)
      .then(
        (response) => {
          this.props.saveTicketObj(response.data);
          if (response.status === 200) {
            this.props.setClientConsoleMode(
              ClientConsoleMode.TICKET_STATUS_VIEW
            );
          }
        },
        (error) => {
          if (error.response) {
            this.setState({ isValidInput: false });
            console.log(error.response.data);
          }
        }
      );
  }
  render() {
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <>
        <div className="right-form">
          {this.state.isValidInput === false && (
            <p id="flash-message" className="invalid-flash">
              Invalid ticket credentials. Please try again.
            </p>
          )}
          <form id="status-form" onSubmit={this.onSubmit}>
            <h1 className="contactUs-text">Submitted a Request?</h1>
            <h1>Check request status</h1>
            <br />
            <div className="form">
              Email Address*
              <br />
              <input
                type="text"
                id="statusEmail"
                className="form-textbox"
                value={this.state.email}
                onChange={this.onChangeEmail}
                required
              />
            </div>
            <div className="form">
              Request Number*
              <br />
              <input
                type="text"
                id="requestNumber"
                className="form-textbox"
                value={this.state.id}
                onChange={this.onChangeID}
                required
              />
            </div>
            <br />
            <input
              className="submit"
              id="statusSubmit"
              type="submit"
              value="Check"
            />
          </form>
        </div>
      </>
    );
  }
}
