import React from "react";
import styled from "styled-components";
import MeetUpSmallIcon from "../../../Assets/Images/Icons/MeetUp_Small_Icon.svg";

const NewMeetupBtn = styled.button`
   display: flex;
   background-color: #FFF6E5;
   padding: 10px 15px;
   border-radius: 40px;
   border: 1px solid #E7D0A7;
   cursor: pointer;
   &:hover{
       background-color: #f3e9d7;
   }
`;

const BtnName = styled.span`
   align-self: center;
   font-size: 16px;
   font-weight: bold;
   margin-left: 10px;
`;

const NewMeetup = (props) => {

    return(
        <>
            <NewMeetupBtn onClick={props.functionLB}>
                <img src={MeetUpSmallIcon} alt="Icon Coffee Meetup"/>
                <BtnName>Meetup</BtnName>
            </NewMeetupBtn>
        </>
    )
}

export default NewMeetup;