import React from "react";
import styled from "styled-components";
import CalenderIcon from "../../../../Assets/Images/Icons/Calender_Icon.svg"
import MarckerIcon from "../../../../Assets/Images/Icons/Marcker_Icon.svg"

const SpanDateMeetUp = styled.span`
   margin-left: 10px;
   font-size: 16px;
`;
const SpanPlaceMeetUp = styled.span`
   margin-left: 15px;
   font-size: 16px;
`;
const SectionDateMeetUp = styled.div`
   
`;

const SectionPlaceMeetUp = styled.div`
   margin-top: 10px;
   font-weight: bold;
`;

const SpanAdressMeetUp = styled.div`
   margin-top: 2px;
   margin-left: 25px;
   font-size: 16px;
`;

const InfoMeetupPlace = (props) => {
    return (
        <>
            <div>
                <SectionDateMeetUp>
                    <img src={CalenderIcon} alt="Icon calender"/>
                    <SpanDateMeetUp>{props.DateM}</SpanDateMeetUp>
                    <SpanDateMeetUp>{props.TimeM}</SpanDateMeetUp>
                </SectionDateMeetUp>
                <SectionPlaceMeetUp>
                    <img src={MarckerIcon} alt="Icon marker" />
                    <SpanPlaceMeetUp>{props.CompanyName}</SpanPlaceMeetUp>
                </SectionPlaceMeetUp>
                <SpanAdressMeetUp>{props.AdressM}</SpanAdressMeetUp>
            </div>
        </>
    )
}

export default InfoMeetupPlace;