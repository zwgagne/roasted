import React from "react";
import styled from "styled-components";
import InfoMeetupPlace from "./InfoMeetupPlace";
import UsersMeetup from "./UsersMeetup";
import MeetUpIcon from "../../../../Assets/Images/Icons/MeetUp_Icons.svg"
import ClockIcon from "../../../../Assets/Images/Icons/Clock_Icon.svg"
import Timer from "../Timer/Timer";

const ContainerCard = styled.div`
   background-color: #FFFCF7;
   display: flex;
   flex-wrap: wrap;
   margin-bottom: 18px;
   width: 866px;
   padding: 26px;
   border-radius: 20px;
   box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
   @media (max-width: 960px) {
    width: 70%;
    padding: 20px;
  }
  @media (max-width: 660px) {
    width: 100%;
    padding: 20px;
  }
`;

const BgColorCard = styled.div`
   background-color: #FFF6E5;
   width: 100%;
   border-radius: 20px;
   padding: 15px 20px;
   display: flex;
   flex-wrap: wrap;
`;
const SectionTop = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
`;
const SectionBottom = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   background-color: #FFFCF7;
   padding: 20px 25px;
   margin-top: 20px;
   border-radius: 20px;
   align-items: center;
   text-align: left;
`;
const TitlePost = styled.div`
   width: 100%;
   font-weight: bold;
   font-size: 32px;
   margin-bottom: 8px;
`;
const TimerInfo = styled.div`
   width: 75%;
   height: 40%;
   margin-left: 10px;
`;

const PostCardMeetUp = () => {
    let dateBd = new Date("2021-12-05T12:00:00").getTime() // Fetch la date en ISO ici

    return (
        <>
            <ContainerCard>
                <BgColorCard>
                    <SectionTop>
                        <img src={MeetUpIcon} />
                        <TimerInfo>
                            <TitlePost>Meetup</TitlePost>
                            <img src={ClockIcon} />
                            <Timer countdownTimestampMs={dateBd} />
                        </TimerInfo>
                    </SectionTop>
                    <SectionBottom>
                        <InfoMeetupPlace DateM="13/12/2020" TimeM="17h30" CompanyName="Café Smith" AdressM="1525 Blvd René-Levesque Ouest" />
                        <UsersMeetup UserName1="Vous" UserName2="Blkoffee" />
                    </SectionBottom>
                </BgColorCard>
            </ContainerCard>
        </>
    )
}

export default PostCardMeetUp;