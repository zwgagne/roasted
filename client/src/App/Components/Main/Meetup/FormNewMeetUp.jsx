import React from "react";
import styled from "styled-components";
import AvatarIcon from "../../../../Assets/Images/Icons/Avatar_Icon_Profil.svg"

const ContainerFrom = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding: 10px 60px;
`;
const ContainerUserInvite = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 30px;
`;
const SpanNameUI = styled.span`
   margin-left: 10px;
   font-size: 16px;
`;
const SectionFrom = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: left;
`;
const PInfoAction = styled.p`
   font-weight: bold;
   font-size: 16px;
   margin-top: 0px;
`;

const LabelForm = styled.label`
   font-weight: bold;
   font-size: 16px;
   width: 100%;
`;
const InputForm = styled.input`
   font-size: 16px;
   width: 100%;
   background-color: transparent;
   border: none;
   border-bottom: solid 1px #000000;
   margin-top: 10px;
   margin-bottom: 15px;
`;

const ButtonSumitForm = styled.button`
   width: 100%;
   margin-top: 25px;
   background-color: #E7D0A7;
   text-decoration: none;
   font-size: 18px;
   font-weight: bold;
   font-family: 'Roboto', sans-serif;
   border: none;
   padding: 15px 40px;
   border-radius: 40px;
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
`;

const FormNewMeetUp = (props) => {
    return (
        <>
            <ContainerFrom>
                <SectionFrom>
                    <h2>Nouveau Meetup</h2>
                    <PInfoAction>Utilisateur invité</PInfoAction>
                    <ContainerUserInvite>
                        <img src={AvatarIcon} alt="Avatar icon" />
                        <SpanNameUI>Edouard_Koffee</SpanNameUI>
                    </ContainerUserInvite>
                    <form>
                        <LabelForm htmlFor="placeMU">Lieu de rencontre</LabelForm>
                        <InputForm type="text" id="placeMU" name="place" placeholder="Nom de l'etablissement" />

                        <LabelForm htmlFor="adressMU">Adresse</LabelForm>
                        <InputForm type="text" id="adressMU" name="adress" placeholder="Adresse et Ville" />

                        <LabelForm htmlFor="dateMU">Date de la rencontre</LabelForm>
                        <InputForm type="date" id="dateMU" name="date" placeholder="" />

                        <LabelForm htmlFor="timeMU">Heure</LabelForm>
                        <InputForm type="time" id="timeMU" name="time" placeholder="" />

                        <ButtonSumitForm type="submit" onClick={props.functionLB3}>Imposer une Meetup</ButtonSumitForm>
                    </form>
                </SectionFrom>
            </ContainerFrom>
        </>
    )
}

export default FormNewMeetUp;