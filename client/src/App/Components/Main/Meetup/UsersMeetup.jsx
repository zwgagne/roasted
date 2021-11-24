import React from "react";
import styled from "styled-components";
import Avatare from "../../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";

const ContainerUserInfo = styled.div`
   margin-left: 18%;
`;
const SectionUserInfo = styled.div`
   display: flex;
   align-items: center;
`;
const SpanUserName = styled.span`
   margin: 10px;
`;
const UserImage = styled.img`
   width: 25%;
`;
const UserImage1 = styled.img`
   width: 25%;
   margin-top: 10px;
`;

const UsersMeetup = (props) => {
    return (
        <ContainerUserInfo>
            <SectionUserInfo>
                <UserImage src={Avatare} alt="User Avatar" />
                <SpanUserName>{props.UserName1}</SpanUserName>
            </SectionUserInfo>
            <SectionUserInfo>
                <UserImage1 src={Avatare} alt="User Avatar" />
                <SpanUserName>{props.UserName2}</SpanUserName>
            </SectionUserInfo>
        </ContainerUserInfo>
    )
}

export default UsersMeetup;