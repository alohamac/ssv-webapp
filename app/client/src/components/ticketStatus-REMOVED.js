/***********************************
 * ! This file is no longer in use
 * Replaced by `clientTicketStatusView.js`
 * Reason: As SSV required more funcionality, we had to rethink
 * initial naming, architecture schemes
 */

import React, { Component } from "react";

/* prettier-ignore */
export default class TicketStatus extends Component {
  render() {
    return (
      <>
      <h2 style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>Request number: #{this.props.ticketInfo.ticketID}</h2>
      <h3 style={{fontWeight:500, fontSize:"26px", textAlign:"center", marginBottom:"80px"}}>Status: {this.props.ticketInfo.status}</h3>

      <h2 style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>Your Ticket:</h2>
      <h3 style={{margin:"0 auto", fontWeight:500, fontSize:"26px",textAlign:"center", marginRight:"100px", marginLeft:"100px"}}>
        {this.props.ticketInfo.requestDescription}
      </h3>
      </>
    );
  }
}
