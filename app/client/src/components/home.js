/*
Homepage component
Renders UI for the homepage
*/
import React, { Component } from "react";
import "../static/style.css";
import Logo from "../static/images/logo.png";
import { Link } from "react-router-dom";

export default class App extends React.Component {

  /*
  Mobile UI update:
  As the window size changes, the app will look at its width
  and changes the size of texts/images on the screen accordingly
  */
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

  getSize(innerWidth) {
    if (innerWidth <= 500) return "28px"
    if (innerWidth <= 700) return "32px"
    if (innerWidth <= 900) return "40px"
    if (innerWidth <= 1100) return "50px"
    return "58px"
  }

  getH3Size(innerWidth) {
    if (innerWidth <= 500) return "18px"
    if (innerWidth <= 700) return "22px"
    if (innerWidth <= 900) return "30px"
    if (innerWidth <= 1100) return "35px"
    return "38px"
  }

  getImageSize(innerWidth) {
    if (innerWidth <= 500) return "200px"
    if (innerWidth <= 700) return "250px"
    if (innerWidth <= 900) return "300px"
    if (innerWidth <= 1100) return "350px"
    return "450px"
  }

  render() {
    const h2Style = {
      "font-size": this.getSize(this.state.innerWidth)
    }

    const h3Style = {
      "font-size": this.getH3Size(this.state.innerWidth)
    }

    const imageStyle = {
      "width": this.getImageSize(this.state.innerWidth)
    }
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <body>
        <div className="containter">
          <div className="row">
            <div className="col-1">
              <h2 style={h2Style}> Starlight Sonata Ventures</h2>
              <hr></hr>
              <h3 style={h3Style}>
                This is a brief introduction <br></br>about SSV. This block
                should<br></br>be no more than 3-4 lines.
              </h3>
            </div>
            <div
              id="image" 
              className="col-2">
              <img style={imageStyle}
                src={Logo}
                className="big-logo"
                alt="Startlight Sonata Ventures Logo"
              ></img>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
