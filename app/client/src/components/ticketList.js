/*
Employee ticket viewing panel
*/

import React, { Component, useRef } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import "../static/style.css";
import EmployeeConsoleMode from "./employeeConsoleMode";

export default class TicketList extends Component {
  state = {
    rowData: "",
  };

  componentDidMount() {
    axios.get("http://localhost:5000/tickets/").then(
      (response) => {
        const data = response.data; // should have all the ticket
        this.props.setLocalAllTicketsArr(data);
      },
      (error) => {
        if (error.response) {
          console.log(
            "Error: TicketList - not getting responses back from remote API"
          );
        }
      }
    );
  }

  /* Save whatever ticket data we need then save in parent */
  handleTableClick = async (rowData, index) => {
    const newRowData = {
      ticketID: rowData.ticketID,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      status: rowData.status,
      email: rowData.email,
      phoneNumber: rowData.phoneNumber,
      company: rowData.company,
      zipcode: rowData.zipcode,
      requestDescription: rowData.requestDescription,
      discId: rowData.discId,
    };

    this.props.setLocalTicketObj(newRowData, index);
    this.props.setMode(EmployeeConsoleMode.TICKET_UPDATE_VIEW);
  };

  render() {
    const columns = [
      { title: "Ticket Number", field: "ticketID" },
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Status", field: "status" },
      { title: "Email", field: "email" },
      { title: "Phone Number", field: "phoneNumber" },
      { title: "Company", field: "company" },
      { title: "Zipcode", field: "zipcode" },
      { title: "Description", field: "requestDescription" },
    ];

    return (
      <div style={{ margin: 20 }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <MaterialTable
          columns={columns}
          data={this.props.tickets}
          title="Submitted Tickets"
          options={{
            tableLayout: "auto",
            draggable: true,
          }}
          actions={[
            {
              icon: "comment",
              tooltip: "View Ticket",
              onClick: (event, rowData) => {
                this.handleTableClick(rowData, rowData.tableData.id);
              },
            },
          ]}
        />
      </div>
    );
  }
}
