/************************************
 * File: navBar.js
 *
 * Renders the navbar and either a horizontal list
 * of menu items or a full screen vertical list
 * of menu items depending on the screen size and
 * whether or not the menu is open.
 */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../static/images/logo.png";
import Menu from "./menu.js";
import IconBars from "./iconBars";
import IconTimes from "./iconTimes";
import MobileMenu from "./mobileMenu";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleMobileMenu = () => {
    console.log("Toggled");
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  closeMobileMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <div id="navbar" className="nav-container">
        <div className="nav-logo-wrapper">
          <Link id="logoBtn" to="/">
            <img
              id="logoNavbar"
              src={Logo}
              className="nav-logo"
              alt="Starlight Sonata Ventures Logo"
            ></img>
          </Link>

          <div id="appTitle" className="nav-title">Starlight Sonata Ventures</div>
        </div>
        <div className="nav-mobile-icon">
          {this.state.isOpen === true ? (
            <IconTimes toggleMobileMenu={this.toggleMobileMenu} />
          ) : (
            <IconBars toggleMobileMenu={this.toggleMobileMenu} />
          )}
        </div>
        {this.state.isOpen ? (
          <MobileMenu
            isOpen={this.state.isOpen}
            toggleMobileMenu={this.toggleMobileMenu}
            closeMobileMenu={this.closeMobileMenu}
          />
        ) : (
          <Menu isOpen={this.state.isOpen} />
        )}

      </div>
    );
  }
}

export default NavBar;
