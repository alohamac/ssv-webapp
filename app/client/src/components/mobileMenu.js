/*************************************
File monileMenu.js

Render Mobile UI menu
**************************************/
import React from "react";
import IconTimes from "./iconTimes";
import Menu from "./menu";

class MobileMenu extends React.Component {
  render() {
    return (
      <div className="mobile-menu-container">
        <IconTimes toggleMobileMenu={this.props.toggleMobileMenu} />
        <div className="mobile-menu-wrapper">
          <Menu
            isOpen={this.props.isOpen}
            closeMobileMenu={this.props.closeMobileMenu}
          />
        </div>
      </div>
    );
  }
}

export default MobileMenu;
