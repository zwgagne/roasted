import React from "react";
import styled from "styled-components";

const MessagesList = styled.ul`
  color: #ec734d;
  margin-top: 0;
  padding: 0;
  list-style-type: none;
`

const Messages = ( props ) => {
  return (
      <MessagesList >
      {props.serverMessage.map((message) => (
        <li key={Math.random()}>{message}</li>
      ))}
      </MessagesList >
  )
}

export default Messages;