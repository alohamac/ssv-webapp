/*****************************************************************
 *   File: clientTicketStatusView
 * Replaced ticketStatus.js to add more context to the name due to
 * the expansion of the webapp
 *
 * This view is intended to be used by Clients to:
 * - View status of their ticket
 * - Read comments left by Admin
 * - Leave comments related to their issue
 ****************************************************************/

import React, { Component } from "react";
import axios from "axios";
import "../static/style.css";
import Button from "./button";
import CommentTable from "./commentTable";
import ClientConsoleMode from "./clientConsoleMode";
import IconArrow from "./iconArrow";

export default class ClientTicketStatusView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: "",
      commentObj: [],
      discBoard: {},
    };
  }

  async componentDidMount() {
    await this.setDiscussionBoardObj(this.props.ticketInfo.discId);
    await this.setCommentObj();
  }

  /***************************
   * Handlers
   * ************************/
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

  /***************************
   * Ticket Mutator Methods
   * ************************/
  updateTicketDiscId = async (newDiscId) => {
    //Save to DB
    const url =
      "http://localhost:5000/tickets/updateDiscId/" +
      this.props.ticketInfo.ticketID +
      "/" +
      newDiscId;

    await axios.put(url).then(
      // (response) => {},
      (error) => {
        console.log(error);
      }
    );
    //Change ticket[] in parent to reflect new discId
    this.props.updateTicketDiscIdLocal(newDiscId);
  };

  /*****************************************
   * DiscussionBoard Object Methods
   ****************************************/
  setDiscussionBoardObj = async (discId) => {
    const url = "http://localhost:5000/discussionBoard/" + discId;
    await axios.get(url).then((response) => {
      const data = response.data;
      this.setState({ discBoard: data });
    });
  };

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

  createDiscussionBoard = async (newObj) => {
    const url = "http://localhost:5000/discussionBoard";
    await axios.post(url, newObj).then((error) => {
      console.log(error);
    });
  };

  updateDiscussionBoard = async (newObj, discId) => {
    const url = "http://localhost:5000/discussionBoard/" + discId;

    await axios.put(url, newObj).then((error) => {
      console.log(error);
    });
  };

  /******************************************
   * Comment Object Methods
   * ***************************************/
  setCommentObj = async () => {
    console.log("DiscComList: " + this.state.discBoard.discCommentList);
    const discCommentList = this.state.discBoard.discCommentList;
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
            console.log("Unexpected error - ticketlistJS");
          }
        }
      );
  };

  submitComment = async () => {
    if (this.state.commentText !== "") {
      const comId = "C-" + Math.random().toString().slice(2, 12);
      const newComment = {
        comId: comId,
        comBody: this.state.commentText,
        comIsAdmin: false,
        comName: this.props.ticketInfo.firstName,
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

      // Check if there exists a discId
      if (this.props.ticketInfo.discId === "") {
        // No discussion board present yet, create a new one
        const discId = "D-" + Math.random().toString().slice(2, 12);

        const newDiscBoardObj = {
          discId: discId,
          discAdminList: ["TestAdmin-0294042094"],
          discClientList: ["TestClient-029404209"],
          discCommentList: [comId],
        };

        //Create a new discussion board
        //Save to db
        this.createDiscussionBoard(newDiscBoardObj);

        //Save the new DiscussionBoard ID (db and locally)
        this.updateTicketDiscId(discId);
      } else {
        // If yes
        // Update discCommentList by appending new comId to existing list
        // Save to DiscBoard db
        await this.getDiscussionBoard(this.props.ticketInfo.discId);

        const newDiscCommentList = [...this.state.discBoard.discCommentList];
        newDiscCommentList.push(comId);

        const updatedDiscussionBoard = {
          discCommentList: newDiscCommentList,
        };
        this.updateDiscussionBoard(
          updatedDiscussionBoard,
          this.props.ticketInfo.discId
        );
      }

      this.setState({
        commentText: "",
      });
    }
  };

  clearCommentObj = () => {
    this.setState({ commentObj: [] });
  };

  render() {
    return (
      <div id="ticketStatusPage" className="ticket-status-page">
        <div className="ticket-status-menu">
          <button
            type="button"
            className="ticket-status-menu-btn"
            onClick={() => {
              this.clearCommentObj();
              this.props.setMode(ClientConsoleMode.CONTACT_US_VIEW);
            }}
          >
            <IconArrow direction={"left"} />
            {/* {this.props.rowData.ticketID} */}
          </button>

          {/* {this.state.showDropdownMenu ? (
          <DropDownStatus changeStatus={this.changeStatus} />
        ) : null} */}
        </div>
        <div id="ticketViewTicketDetails" className="ticket-status-container">
          <div className="ticket-status-desc-container">
            <h2
              style={{ fontWeight: 600, fontSize: "32px", textAlign: "center" }}
            >
              Request number: #
              <div id="ticketViewTicketNum">
                {this.props.ticketInfo.ticketID}
              </div>
            </h2>
            <h3
              style={{
                fontWeight: 500,
                fontSize: "26px",
                textAlign: "center",
                marginBottom: "80px",
              }}
            >
              Status:
              <div id="ticketViewTicketStatus">
                {this.props.ticketInfo.status}
              </div>
            </h3>

            <h2
              style={{ fontWeight: 600, fontSize: "32px", textAlign: "center" }}
            >
              Your Ticket:
            </h2>
            <h3
              style={{
                margin: "0 auto",
                fontWeight: 500,
                fontSize: "26px",
                textAlign: "center",
                marginRight: "100px",
                marginLeft: "100px",
              }}
            >
              <div id="ticketViewDescription">
                {this.props.ticketInfo.requestDescription}
              </div>
            </h3>
          </div>
          <div
            id="ticketViewDiscussionBoard"
            className="ticket-status-chat-container"
          >
            <div id="ticketViewChatBox" className="ts-chat-box">
              <textarea
                id="ticketViewTextArea"
                className="ts-chat-box"
                onChange={this.handleChange}
                value={this.state.commentText}
                name="commentText"
              ></textarea>
              <div className="ts-btns-wrapper">
                <Button
                  id={"submitComment"}
                  type={"button"}
                  buttonText={"Comment"}
                  onClick={this.submitComment}
                />
                <Button
                  id={"cancelComment"}
                  type={"button"}
                  onClick={this.cancelComment}
                  buttonText={"Cancel"}
                />
              </div>
            </div>
            {this.state.commentObj !== null ? (
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
