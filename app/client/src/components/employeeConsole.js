/*************************************************************
 * File: employee.js
 *
 * This files handles the rendering of the employee console.
 *
 */

import React, { Component } from "react";
import "../static/style.css";
import TicketList from "./ticketList";
import TicketUpdateView from "./ticketUpdateView";
import EmployeeConsoleMode from "./employeeConsoleMode";

export default class EmployeeConsole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: EmployeeConsoleMode.TICKET_TABLE_VIEW,
      ticketObj: {},
      allTicketsArr: [],
      ticketIndex: "",
    };
  }
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.props.history.push("/");
  }

  /**************************
   * Utilities
   */
  setMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  /*******************************
   * Local Setters
   */
  setLocalAllTicketsArr = (newTicketArr) => {
    this.setState({ allTicketsArr: newTicketArr });
  };

  setTicketObj = (newObj, index) => {
    this.setState({ ticketObj: newObj, ticketIndex: index });
  };

  updateTicketDiscId = (newDiscId) => {
    const newTicketObj = {
      ticketID: this.state.ticketObj.ticketID,
      firstName: this.state.ticketObj.firstName,
      lastName: this.state.ticketObj.lastName,
      status: this.state.ticketObj.status,
      email: this.state.ticketObj.email,
      phoneNumber: this.state.ticketObj.phoneNumber,
      company: this.state.ticketObj.company,
      zipcode: this.state.ticketObj.zipcode,
      requestDescription: this.state.ticketObj.requestDescription,
      discId: newDiscId,
    };
    this.setState({ ticketObj: newTicketObj });
  };

  componentDidMount(){
    console.log(localStorage.getItem('role'))
    if (localStorage.getItem('role') && (localStorage.getItem('role') != 'admin' && localStorage.getItem('role') != 'mod')){
      this.props.history.push("/login")
    }
  }
  render() {
    return (
      <>
        <h1>Hello {localStorage.getItem("username")}</h1>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <div style={{ textAlign: "right" }}>
          <a href="viewPendingEmployees" style={{ margin: 20 }}>
            Pending Employees
          </a>
        </div>
        {
          {
            TicketTableView: (
              <TicketList
                adminName={localStorage.getItem("username")}
                setLocalTicketObj={this.setTicketObj}
                setLocalAllTicketsArr={this.setLocalAllTicketsArr}
                setMode={this.setMode}
                tickets={this.state.allTicketsArr}
              ></TicketList>
            ),
            TicketUpdateView: (
              <TicketUpdateView
                adminName={localStorage.getItem("username")}
                setMode={this.setMode}
                updateTicketDiscId={this.updateTicketDiscId}
                ticketObj={this.state.ticketObj}
                ticketIndex={this.state.ticketIndex}
              />
            ),
          }[this.state.mode]
        }
      </>
    );
  }
}
