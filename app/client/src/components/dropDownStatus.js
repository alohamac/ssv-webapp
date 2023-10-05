/************************************************
 * File: dropDownStatus.js
 *
 * This provides the dropdown menu UI when updating
 * the status for a client.
 *
 * It currently supports the required status changes
 *   - Not Started
 *   - Cancel Ticket
 *   - In Progress
 *   - Complete
 ***********************************************/

import React from "react";

class DropDownStatus extends React.Component {
  render() {
    return (
      <div className="dropdown-container">
        <div className="dropdown-content">
          <ul>
            <li
              onClick={() => {
                this.props.changeStatus("Not Started");
              }}
            >
              Not Started
            </li>
            <li
              onClick={() => {
                this.props.changeStatus("Cancelled");
              }}
            >
              Cancelled
            </li>
            <li
              onClick={() => {
                this.props.changeStatus("In Progress");
              }}
            >
              In Progress
            </li>
            <li
              onClick={() => {
                this.props.changeStatus("Complete");
              }}
            >
              Complete
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DropDownStatus;
