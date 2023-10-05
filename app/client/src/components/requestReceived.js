/********************************
 * File: requestReceived.js
 *
 * This page is used to inform clients that their request has been received
 * and return their ticketID for future reference
 */
import React, { Component } from 'react';

export default class RequestReceived extends Component {
  render() {
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
        <>
        <h1 style={{fontWeight:600, fontSize:"58px", textAlign:"center", marginBottom:"20px"}}>Contact Us</h1>

        <h2 style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>Your Request Has Been Created</h2>
        <h3 style={{fontWeight:500, fontSize:"26px", textAlign:"center", marginBottom:"80px"}}>Request number: #{this.props.ticketID}</h3>

        <h2 style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>We will reach out to you within 2-6 business days</h2>
        <h3 style={{margin:"0 auto", fontWeight:500, fontSize:"26px", width:"50%", textAlign:"center"}}>
            In the meantime, please use the request number to check your request status
        </h3>
        </>
    );
  }
}