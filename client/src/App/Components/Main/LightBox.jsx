import React from "react";
import styled from "styled-components";
import FormNewMeetUp from "./Meetup/FormNewMeetUp";

const ContainerLightBox = styled.div`
   position: absolute;
   z-index: 9999;
   background-color: #FFFCF6;
   display: flex;
   flex-wrap: wrap;
   justify-content: left;
   width: 400px;
   padding: 26px;
   top: 22%;
   border-radius: 20px;
   @media (max-width: 503px) {
    width: 70%;
  }
`;

const LightBox = (props) => {
    return (
        <>
            <ContainerLightBox>
                <FormNewMeetUp functionLB3={props.functionLB2}/>
            </ContainerLightBox>
        </>
    )
}

export default LightBox;