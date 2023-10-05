/*
aboutUs component
Renders UI for the About Us page
*/
import React, { Component } from "react";
import "../static/style.css";
import Logo from "../static/images/logo.png";
import Background1 from "../static/images/background1.png";
import Background2 from "../static/images/background2.png";
import { Link } from "react-router-dom";

export default class AboutUs extends React.Component {
  state = {
    innerWidth: window.innerWidth
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }

  resize() {
    this.setState({innerWidth: window.innerWidth})
  }

  getH2Size(innerWidth) {
    if (innerWidth <= 500) return "28px"
    if (innerWidth <= 700) return "32px"
    if (innerWidth <= 900) return "40px"
    if (innerWidth <= 1100) return "50px"
    return "58px"
  }

  getPSize(innerWidth) {
    if (innerWidth <= 500) return "15px"
    if (innerWidth <= 700) return "20px"
    if (innerWidth <= 900) return "25px"
    if (innerWidth <= 1100) return "30px"
    return "35px"
  }

  render() {
    const h2Style = {
      "font-size": this.getH2Size(this.state.innerWidth)
    }

    const pStyle = {
      "font-size": this.getPSize(this.state.innerWidth)
    }

    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <body>
        <div className="containter">
          <h1 style={{ textAlign: "center", margin: this.state.innerWidth/35, fontSize: this.state.innerWidth/18 }}>
            About Us
          </h1>
          <div
            id="aboutUs-row-1"
            className="aboutUs-row-1"
            style={{
              backgroundImage: `url(${Background1})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: this.state.innerWidth/2,
              width: this.state.innerWidth,
            }}
          >
            <div 
              id="aboutUs-col-1"
              className="aboutUs-col-1">
              <h2 style={h2Style}>What We Do</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
          </div>
          <div
            id="#aboutUs-row-2"
            className="aboutUs-row-2"
            style={{
              backgroundImage: `url(${Background2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: this.state.innerWidth/2,
              width: this.state.innerWidth,
            }}
          >
            <div className="aboutUs-col-1">
              <h2 style={h2Style}>Our Mission</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
          </div>

          <h1 style={{ textAlign: "center", margin: this.state.innerWidth/35, fontSize: this.state.innerWidth/18 }}>
            Our Partners
          </h1>
          <div className="partner-row">
            <div 
              id="partner-col-left"
              className="partner-col-left">
              <h2 style={h2Style}>Company A</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
            <div
              id="partner-col-right2" 
              className="partner-col-right">
              <h2 style={h2Style}>Company A</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
            <div className="partner-col-left">
              <h2 style={h2Style}>Company A</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
            <div className="partner-col-right">
              <h2 style={h2Style}>Company A</h2>
              <p style={pStyle}>
                Lorem ipsum dolor sit amet,<br></br>consectetur adipiscing elit,
                sed do <br></br>eiusmod tempor incididunt ut labore <br></br>et
                dolore magna aliqua. Ut enim ad <br></br>minim veniam.
              </p>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
