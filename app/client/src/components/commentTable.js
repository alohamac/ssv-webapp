/*******************************************************
 * File: commentTable.js
 * 
 * Responsible for rendering the list of comments
 * 
 * Builds the table of comments, then renders.
 */

import React from "react";
import Comment from "./comment";

class CommentTable extends React.Component {
  render() {
    const table = [];
    for (let r = 0; r < this.props.commentObj.length; ++r) {

      //Metadata of the comment. Name of commenter and date
      const tagString =
        this.props.commentObj[r].comName +
        " on " +
        this.props.commentObj[r].comDate;

        //Pushes each comment into the 'table' array
      table.push(
        <Comment text={this.props.commentObj[r].comBody} tag={tagString} />
      );
    }
    return <div className="ts-chat-comment-container">{table}</div>;
  }
}

export default CommentTable;
