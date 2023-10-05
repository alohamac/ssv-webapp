/*************************************************************
 * File: viewPendingEmployees.js
 *
 * This file contains and renders the "view pending employee" component.
 */
import React, { Component, useRef } from "react";
import "../static/style.css";
import MaterialTable from "material-table";
import axios from "axios";

export default class viewPendingEmployee extends Component {
  state = {
    pendingEmployees: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/employees/register/pending/").then(
      (response) => {
        const { data } = response.data;
        this.setState({ pendingEmployees: data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  approveRegistration = async (rowData, index) => {
    await axios
      .patch(
        "http://localhost:5000/employees/register/approve/" + rowData.employeeID
      )
      .then(
        () => {
          let newEmployees = [...this.state.pendingEmployees];
          newEmployees.splice(index, 1);
          this.setState({
            pendingEmployees: newEmployees,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  deleteEmployee = async (rowData, index) => {
    await axios
      .delete("http://localhost:5000/employees/delete/" + rowData.employeeID)
      .then(
        () => {
          let newEmployees = [...this.state.pendingEmployees];
          newEmployees.splice(index, 1);
          this.setState({
            pendingEmployees: newEmployees,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    const columns = [
      {
        title: "Name",
        render: (rowData) => rowData.firstName + " " + rowData.lastName,
      },
      { title: "Username", field: "userName" },
      { title: "Email", field: "email" },
      { title: "Phone Number", field: "phoneNumber" },
    ];
    return (
      <>
        <a href="employeeConsole" style={{ margin: 20 }}>
          Back
        </a>
        <MaterialTable
          columns={columns}
          data={this.state.pendingEmployees}
          title="Pending Employees"
          actions={[
            {
              icon: "check",
              tooltip: "Approve employee",
              onClick: (event, rowData) => {
                this.approveRegistration(rowData, rowData.tableData.id);
                alert(
                  `You approved ${rowData.firstName} ${rowData.lastName}'s registration`
                );
              },
            },
            {
              icon: "delete",
              tooltip: "Delete user",
              onClick: (event, rowData) => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${rowData.firstName} ${rowData.lastName}?`
                  )
                ) {
                  this.deleteEmployee(rowData, rowData.tableData.id);
                }
              },
            },
          ]}
        />
      </>
    );
  }
}
