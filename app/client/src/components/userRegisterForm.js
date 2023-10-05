/********************************
 * File: registerForm.js
 *
 * This holds the code for the registration form along with
 * its 'regisrtation complete' page.
 */

import React, { Component } from "react";
import "../static/style.css";
import Logo from "../static/images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default class UserRegistrationForm extends Component {
    constructor(props){
        super(props);
    
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            username: "",
            password: "",
            isSubmitted: false,
            ticket: "",
            invalidRegistration: false,
            token: ""
        }
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.username,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password
        }
        await axios.post("http://localhost:5000/user/register/"+JSON.stringify(user     ))
        .then((response)=>{
            this.setState({isSubmitted:true})
        }, (error)=>{
            this.setState({invalidRegistration: true})
            console.log(error)
        })
    }

    render() {
        // if form was not submitted
        if (!this.state.isSubmitted)
        {
            return (
                <>
                <a href="">Return to login</a>
                <h1 style={{ fontWeight: 600, fontSize: "42px", textAlign: "center" }}>
                    User Registration
                </h1>
                <div style={{ textAlign: "center" }}>
                    <form id="form" onSubmit={this.onSubmit}>
                        {this.state.invalidRegistration===true && 
                        <p id="flash-message" className="invalid-flash">
                            Username or email already exists
                        </p>}
                        <br/>
                        <label>
                        <div className="form">
                            First Name
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
                        </label>
                        <label>
                        <div className="form">
                            Last Name
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
                        </label>
                        <br style={{ clear: "both" }} />
                        <label>
                        <div className="form">
                            Email Address
                            <br />
                            <input
                                type="email"
                                id="email"
                                className="form-textbox"
                                value={this.state.email} 
                                onChange={this.onChangeEmail}
                                required
                            />
                        </div>
                        </label>
                        <label>
                        <div className="form">
                            Phone Number
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
                        </label>
                        <br style={{ clear: "both" }} />
                        <label>
                        <div className="form">
                            Username
                            <br />
                            <input
                                type="text"
                                id="username"
                                className="form-textbox"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                required
                            />
                        </div>
                        </label>
                        <label>
                        <div className="form">
                            Password
                            <br />
                            <input type="password"
                                id="password"
                                className="form-textbox"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                            />
                        </div>
                        </label>
                        <br />
                        <button type="submit" id="submit" className="submit">
                        Submit
                        </button>
                    </form>
                </div>
                </>
            );
        }
        else{
            return(
                <>
                <h2 style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>Registration Complete</h2>
                <div style={{textAlign:"center"}}><a href="">Return to login</a></div>
                </>
            )
        }
    }
}
 