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
    
    const [meetupInfo, setMeetupInfo] = useState()
    const [sentMeetupInfo, setSentMeetupInfo] = useState()
    
    async function getMeetupInfo() {
        try {
            const response = await fetch("http://localhost:5000/meet/get-meetup-info", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            
            const parseRes = await response.json();
            setMeetupInfo(parseRes.rows);
        } catch (err) {
            console.error(err.message)
        }
    }

    async function getSentMeetupInfo() {
        try {
            const response = await fetch("http://localhost:5000/meet/get-sent-meetup-info", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            
            const parseRes = await response.json();
            setSentMeetupInfo(parseRes.rows);
        } catch (err) {
            console.error(err.message)
        }
    }

    
    useEffect(() => {
        getMeetupInfo();
        getSentMeetupInfo();
    }, [])    


    return (
        <>
            
            {meetupInfo && meetupInfo.map((meetup) => (

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
                        <UsersMeetup UserName1="Vous" UserName2={meetup.user_name} />
                    </SectionBottom>
                        <p>Une initiative de : {meetup.user_name}</p>
                </BgColorCard>
            </ContainerCard>
            ))}

            {sentMeetupInfo && sentMeetupInfo.map((meetup) => (

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
                        <UsersMeetup UserName1="Vous" UserName2={meetup.user_name} />
                    </SectionBottom>
                        <p>Vous avez envoyé l'invitation</p>
                </BgColorCard>
            </ContainerCard>
            ))}

        </>
    )
}

export default PostCardMeetUp;