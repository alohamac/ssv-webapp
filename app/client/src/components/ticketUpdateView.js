/**************************************************
 * File: ticketUpdateView.js
 *
 * This component is intended for use by members of
 *  management to aid in the following tasks related
 *  to support management:
 *    View ticket
 *    Update status
 *    accept messages
 *    deliver messages
 *
 ***********************************************/

import axios from "axios";
import React from "react";
import "../static/style.css";
import DropDownStatus from "./dropDownStatus";
import EmployeeConsoleMode from "./employeeConsoleMode";
import CommentTable from "./commentTable";

import IconBars from "./iconBars";
import IconTimes from "./iconTimes";

import IconArrow from "./iconArrow";
import Button from "./button";

//Test

class TicketUpdateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.ticketObj.status,
      showDropdownMenu: false,
      commentText: "",
      discBoard: {},
      commentObj: {},
    };
  }

  async componentDidMount() {
    // Ensures that there is actually a DiscussionBoard associated with this ticket
    if (this.props.ticketObj.discId !== "") {
      await this.setDiscussionBoardObj(this.props.ticketObj.discId);

      let discBoardObj = this.state.discBoard.discCommentList;
      await this.setCommentObj(discBoardObj);
    }
  }

  /********************************
   * Handlers
   *******************************/
  // handles change for any box
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  cancelComment = () => {
    this.setState({
      commentText: "",
    });
  };

  /**************
   * Utilities
   **************/
  /******************************************
   * Used to render a faux Title for ticket
   * Returns the first MAXTITLECHARACTERS of
   * the description, stopping at the first
   * period
   ******************************************/
  findTitle = () => {
    const maxTitleCharacters = 100;
    let desc = this.props.ticketObj.requestDescription;
    let str = desc.substring(0, desc.indexOf(".") + 1);

    if (str === "") {
      return desc.substring(0, maxTitleCharacters);
    }

    return str.substring(0, maxTitleCharacters);
  };

  toggleDropdownMenu = () => {
    this.setState((prevState) => ({
      showDropdownMenu: !prevState.showDropdownMenu,
    }));
  };

  changeStatus = async (newStatus) => {
    //Save to DB
    const url =
      "http://localhost:5000/tickets/" +
      this.props.ticketObj.ticketID +
      "/" +
      newStatus;

    await axios.put(url).then(
      // (response) => {},
      (error) => {
        console.log(error);
      }
    );

    //Save locally here
    this.setState({ status: newStatus });

    //Close dropdown menu
    this.toggleDropdownMenu();
  };

  /**************************
   * DiscussionBoard Methods
   ************************/
  updateTicketDiscId = async (newDiscId) => {
    //Save to DB
    const url =
      "http://localhost:5000/tickets/updateDiscId/" +
      this.props.ticketObj.ticketID +
      "/" +
      newDiscId;

    await axios.put(url).then(
      (response) => {
        this.props.updateTicketDiscId(newDiscId);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createDiscussionBoard = async (newObj) => {
    const url = "http://localhost:5000/discussionBoard";
    await axios.post(url, newObj).then(
      (response) => {
        this.setState({
          discBoard: newObj,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  /*
   * Updates discussion board with given discId with the newDiscBoardObj
   */
  updateDiscussionBoard = async (newDiscBoardObj, discId) => {
    const url = "http://localhost:5000/discussionBoard/" + discId;

    await axios.put(url, newDiscBoardObj).then((error) => {
      console.log(error);
    });
  };

  /*
   * - Performs get request for a discussion board with given discId.
   * - Sets state for reading
   */
  getDiscussionBoard = async (discId) => {
    const url = "http://localhost:5000/discussionBoard/" + discId;

    await axios.get(url).then(
      (response) => {
        const data = response.data;
        this.setState({ discBoard: data });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  setDiscussionBoardObj = async (discId) => {
    const url = "http://localhost:5000/discussionBoard/" + discId;
    await axios.get(url).then((response) => {
      const data = response.data;
      this.setState({ discBoard: data });
    });
  };

  /********************************
   * Comment Methods
   ********************************/
  submitComment = async () => {
    if (this.state.commentText !== "") {
      let discId;
      const comId = "C-" + Math.random().toString().slice(2, 12);
      const newComment = {
        comId: comId,
        comBody: this.state.commentText,
        comIsAdmin: true,
        comName: this.props.adminName,
        comDate: new Date().toString(),
        comTime: Date.now().toString(),
      };

      // Create a new comment, save to Comment db
      const url = "http://localhost:5000/comment";

      await axios.post(url, newComment).then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );

      if (this.props.ticketObj.discId === "") {
        // No discussion board, create one
        discId = "D-" + Math.random().toString().slice(2, 12);

        const newDiscBoardObj = {
          discId: discId,
          discAdminList: ["TestAdmin-0294042094"],
          discClientList: ["TestClient-029404209"],
          discCommentList: [comId],
        };

        await this.createDiscussionBoard(newDiscBoardObj);
        await this.updateTicketDiscId(discId);
      } else {
        discId = this.props.ticketObj.discId;
        await this.getDiscussionBoard(discId);
      }

      const newDiscCommentList = [...this.state.discBoard.discCommentList];
      newDiscCommentList.push(comId);

      const updatedDiscussionBoard = {
        discCommentList: newDiscCommentList,
      };

      await this.updateDiscussionBoard(updatedDiscussionBoard, discId);

      await this.setCommentObj(newDiscCommentList);

      this.setState({
        commentText: "",
      });
    }
  };

  setCommentObj = async (discCommentList) => {
    const newDiscCommentList = [...discCommentList];

    const url = "http://localhost:5000/comment";

    await axios
      .get(url, {
        params: {
          discCommentList: newDiscCommentList,
        },
      })
      .then(
        (response) => {
          const data = response.data;
          this.setState({ commentObj: data });
        },
        (error) => {
          if (error.response) {
            console.log("Unexpected error - updateTicket.js");
          }
        }
      );
  };

  clearCommentObj = () => {
    this.setState({ commentObj: [] });
  };

  render() {
    return (
      <div id="ticketUpdateView" className="ticket-status-page">
        <div className="ticket-status-menu">
          <button
            type="button"
            className="ticket-status-menu-btn"
            onClick={() => {
              this.props.setMode(EmployeeConsoleMode.TICKET_TABLE_VIEW);
              this.clearCommentObj();
            }}
          >
            <IconArrow direction={"left"} />
            {" Ticket #"}
            <div id="ticketViewTicketNum" >
            {this.props.ticketObj.ticketID}
            </div>
          </button>
          <button
            className="ticket-status-menu-btn inner-menu-btn "
            onClick={() => {
              // this.handleStatusChange();
              this.toggleDropdownMenu();
            }}
          >
            {"Status: "}

            <div id="ticketViewTicketStatus">
            {this.state.status}
            </div>
          </button>
          {this.state.showDropdownMenu ? (
            <DropDownStatus changeStatus={this.changeStatus} />
          ) : null}
        </div>
        <div id="ticketViewTicketDetails" className="ticket-status-container">
          <div className="ticket-status-desc-container">
            <h1 id="ticketViewCustomerName">
              {this.props.ticketObj.firstName} {this.props.ticketObj.lastName}
            </h1>
            <h5 id="ticketViewCompany">{this.props.ticketObj.company}</h5>
            <table className="ticket-status-contact-table">
              <tr>
                <td>Email:</td>
                <td id="ticketViewEmail">{this.props.ticketObj.email}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td id="ticketViewPhone">{this.props.ticketObj.phoneNumber}</td>
              </tr>
              <tr>
                <td>Zipcode:</td>
                <td id="ticketViewZip">{this.props.ticketObj.zipcode}</td>
              </tr>
            </table>
            <h2>{this.findTitle()}</h2>
            <h3 id="ticketViewDescr">{this.props.ticketObj.requestDescription}</h3>
          </div>
          <div id="ticketViewDiscussionBoard" className="ticket-status-chat-container">
            <div id="ticketViewChatBox" className="ts-chat-box">
              <textarea
                className="ts-chat-box"
                onChange={this.handleChange}
                value={this.state.commentText}
                name="commentText"
              ></textarea>
              <div className="ts-btns-wrapper">
                <Button
                  id="submitComment"
                  type={"button"}
                  buttonText={"Comment"}
                  onClick={this.submitComment}
                />
                <Button
                  type={"button"}
                  onClick={this.cancelComment}
                  buttonText={"Cancel"}
                />
              </div>
            </div>
            {this.props.commentObj !== null ? (
              <CommentTable
                commentObj={this.state.commentObj}
                discBoard={this.state.discBoard}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default TicketUpdateView;
