/*************************************
File: comment.js
Render chat comment UI
**************************************/

import React from "react";

class Comment extends React.Component {
  render() {
    const { text, tag } = this.props;
    return (
      <div className="ts-chat-comment">
        <div className="ts-chat-comment-text">{text}</div>
        <div className="ts-chat-comment-tag">{tag}</div>
      </div>
    );
  }
}

export default Comment;
