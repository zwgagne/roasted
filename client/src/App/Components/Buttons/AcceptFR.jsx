import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as IconAccept } from "../../../Assets/Images/Icons/AcceptFR.svg";

const LinkAcceptFR = styled(Link)`
   background-color: #E7D0A7;
   padding: 12px;
   border-radius: 50px;
   text-align: center;
   display: flex;
   align-self: center;
   margin-right: 18px;
   &:hover {
  background-color: #EEDDBE;
  box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
  transition: all 0.2s ease;
  }
  &:active {
   background: #E7D0A7;
   box-shadow: inset 1px 2px 10px rgba(65, 40, 30, 0.15);
   transition: all 0.2s ease;
  }
  &:disabled {
   background: #EAE8E3;
   color: #8B8B85;
  }
  &:visited {
    color: inherit;
  }
`

const BtnAcceptFR = (props) => {
    return (
        <>
            <LinkAcceptFR to={props.afr}>
                <IconAccept />
            </LinkAcceptFR>
        </>
    )
}

export default BtnAcceptFR;