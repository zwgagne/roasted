import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as IconRefuse } from "../../../Assets/Images/Icons/RefuseFR.svg";

const LinkRefuseFR = styled(Link)`
   background-color: #E7D0A7;
   padding: 12px;
   border-radius: 50px;
   text-align: center;
   display: flex;
   align-self: center;
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

const BtnRefuseFR = (props) => {
    async function declineFriend(e) {
        e.preventDefault();
        try {
            const friendName = props.afr;
            await fetch(`http://localhost:5000/friends/decline/${friendName}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });
            window.location.reload();

        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <LinkRefuseFR to={props.afr} onClick={(e) => declineFriend(e)}>
                <IconRefuse />
            </LinkRefuseFR>
        </>
    )
}

export default BtnRefuseFR;