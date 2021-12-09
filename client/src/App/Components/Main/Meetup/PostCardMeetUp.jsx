import React, { useEffect, useState } from "react";
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
    
    const [meetupsICreated, setMeetupsICreated] = useState()
    const [meetupsImInvitedTo, setMeetupsImInvitedTo] = useState()
    const [meetupsMyFriendsCreated, setMeetupsMyFriendsCreated] = useState()
    
    async function getMeetupInfo() {
        try {
            const response = await fetch("http://localhost:5000/meet/get-meetup", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            
            const parseRes = await response.json();
            setMeetupsICreated(parseRes.meetupsICreated);
            setMeetupsImInvitedTo(parseRes.meetupsImInvitedTo);
            setMeetupsMyFriendsCreated(parseRes.meetupsMyFriendsCreated);
        } catch (err) {
            console.error(err.message)
        }
    }
    
    useEffect(() => {
        getMeetupInfo();
    }, [])    


    return (
        <>
            
            {meetupsICreated && meetupsICreated.map((meetup) => (

            <ContainerCard key={meetup.meetup_id}>
                <BgColorCard>
                    <SectionTop>
                        <img src={MeetUpIcon} />
                        <TimerInfo>
                            <TitlePost>Meetup</TitlePost>
                            <img src={ClockIcon} />
                            <Timer countdownTimestampMs={new Date(meetup.meetup_time).getTime()} />
                        </TimerInfo>
                    </SectionTop>
                    <SectionBottom>
                        <InfoMeetupPlace DateM={meetup.meetup_time.slice(0, -14)} TimeM={meetup.meetup_time.slice(-13,-8)} CompanyName={meetup.meetup_place} AdressM={meetup.meetup_address} />
                        <UsersMeetup UserName1="Vous" UserName2={meetup.user_invited_name} />
                    </SectionBottom>
                </BgColorCard>
            </ContainerCard>
            ))}

            {meetupsImInvitedTo && meetupsImInvitedTo.map((meetup) => (

            <ContainerCard key={meetup.meetup_id}>
                <BgColorCard>
                    <SectionTop>
                        <img src={MeetUpIcon} />
                        <TimerInfo>
                            <TitlePost>Meetup</TitlePost>
                            <img src={ClockIcon} />
                            <Timer countdownTimestampMs={new Date(meetup.meetup_time).getTime()} />
                        </TimerInfo>
                    </SectionTop>
                    <SectionBottom>
                        <InfoMeetupPlace DateM={meetup.meetup_time.slice(0, -14)} TimeM={meetup.meetup_time.slice(-13,-8)} CompanyName={meetup.meetup_place} AdressM={meetup.meetup_address} />
                        <UsersMeetup UserName1={meetup.user_inviting_name} UserName2="Vous" />
                    </SectionBottom>
                </BgColorCard>
            </ContainerCard>
            ))}

            {meetupsMyFriendsCreated && meetupsMyFriendsCreated.map((meetup) => (

            <ContainerCard key={meetup.meetup_id}>
                <BgColorCard>
                    <SectionTop>
                        <img src={MeetUpIcon} />
                        <TimerInfo>
                            <TitlePost>Meetup</TitlePost>
                            <img src={ClockIcon} />
                            <Timer countdownTimestampMs={new Date(meetup.meetup_time).getTime()} />
                        </TimerInfo>
                    </SectionTop>
                    <SectionBottom>
                        <InfoMeetupPlace DateM={meetup.meetup_time.slice(0, -14)} TimeM={meetup.meetup_time.slice(-13,-8)} CompanyName={meetup.meetup_place} AdressM={meetup.meetup_address} />
                        <UsersMeetup UserName1={meetup.user_inviting_name} UserName2={meetup.user_invited_name} />
                    </SectionBottom>
                </BgColorCard>
            </ContainerCard>
            ))}

        </>
    )
}

export default PostCardMeetUp;