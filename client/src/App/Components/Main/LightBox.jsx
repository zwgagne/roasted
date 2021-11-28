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
   top: 10%;
   border-radius: 20px;
   @media (max-width: 503px) {
    width: 70%;
  }
`;
const ContainerBtnClose = styled.div`
   display: flex;
   width: 100%;
   justify-content: right;
`;
const BtnCloseLB = styled.button`
   border: none;
   background-color: transparent;
   font-size: 19px;
   border-radius: 50px;
   padding: 0px 10px;
   height: 40px;
   width: 40px;
   @media (max-width: 503px) {
    margin-left: 45px;
    text-align: right;
  }
   &:hover{
       background-color: #F6F5F1;
   }
`;

const LightBox = (props) => {
    return (
        <>
            <ContainerLightBox>
                <ContainerBtnClose>
                    <BtnCloseLB onClick={props.functionLB2} >X</BtnCloseLB>
                </ContainerBtnClose>
                <FormNewMeetUp functionLB3={props.functionLB2} />
            </ContainerLightBox>
        </>
    )
}

export default LightBox;