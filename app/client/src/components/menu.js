/**************************************************************
 * File: menu.js
 *
 * Renders the menu items within the navbar
 * We use some conditional class-assignment to determine which
 * version of the menu needs to be rendered
 *
 * The conditional class-assignemnt allows us to store one instance
 * of the list of menu items, rather than duplicating the sections
 * for multiple screen sizes.
 *
 * Can be expanded to incorporate more screen sizes
 */

import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <ul className={this.props.isOpen ? "mobile-menu" : "nav-menu"}>
        <li className={this.props.isOpen ? "mobile-item" : "nav-item"}>
          <Link
            className={this.props.isOpen ? "mobile-link" : "nav-link"}
            id="servicesOfferedBtn"
            to="/servicesOffered"
            onClick={this.props.closeMobileMenu}
          >
            Services Offered
          </Link>
        </li>
        <li className={this.props.isOpen ? "mobile-item" : "nav-item"}>
          <Link
            className={this.props.isOpen ? "mobile-link" : "nav-link"}
            id="aboutUsBtn"
            to="/aboutUs"
            onClick={this.props.closeMobileMenu}
          >
            About Us
          </Link>
        </li>
        <li className={this.props.isOpen ? "mobile-item" : "nav-item"}>
          <Link
            className={this.props.isOpen ? "mobile-link" : "nav-link"}
            id="contactUsBtn"
            to="/contactUs"
            onClick={this.props.closeMobileMenu}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    );
  }
}
export default Menu;
