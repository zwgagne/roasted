import React, { useState } from "react";
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

   const [inputs, setInputs] = useState({
      place: "",
      address: "",
      date: "",
      time: ""
    })
    
    const {place, address, date, time} = inputs;
  
    const onChange = (e) => {
      setInputs({...inputs, [e.target.name] : e.target.value });
    };
  
    const body = {place, address, date, time};


   const onSubmitForm = async (e) => {
      e.preventDefault();
  
      try {
         const params = new URLSearchParams(window.location.search);
         const friendName = params.get("user")
         const response = await fetch(`http://localhost:5000/meet/send-meetup-request/${friendName}`, {
            method: "POST", 
            headers: {
               token: localStorage.token,
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)    
        });
        const parseRes = await response.json();
        console.log(parseRes);

      } catch (err) {
        console.error(err.message)
      }
    }

    return (
        <>
            <ContainerFrom>
                <SectionFrom>
                    <h2>Nouveau Meetup</h2>
                    <PInfoAction>Utilisateur invité</PInfoAction>
                    <ContainerUserInvite>
                        <img src={AvatarIcon} alt="Avatar icon" />
                        <SpanNameUI>{new URLSearchParams(window.location.search).get("user")}</SpanNameUI>
                    </ContainerUserInvite>
                    <form onSubmit={onSubmitForm}>
                        <LabelForm htmlFor="placeMU">Lieu de rencontre</LabelForm>
                        <InputForm onChange={e => onChange(e)} type="text" id="placeMU" name="place" value={place} placeholder="Nom de l'etablissement" />

                        <LabelForm htmlFor="adressMU">Adresse</LabelForm>
                        <InputForm onChange={e => onChange(e)} type="text" id="adressMU" name="address" value={address} placeholder="Adresse et Ville" />

                        <LabelForm htmlFor="dateMU">Date de la rencontre</LabelForm>
                        <InputForm onChange={e => onChange(e)} type="date" id="dateMU" name="date" value={date} placeholder="" />

                        <LabelForm htmlFor="timeMU">Heure</LabelForm>
                        <InputForm onChange={e => onChange(e)} type="time" id="timeMU" name="time" value={time} placeholder="" />

                        <ButtonSumitForm type="submit" >Imposer une Meetup</ButtonSumitForm>
                    </form>
                </SectionFrom>
            </ContainerFrom>
        </>
    )
}

export default FormNewMeetUp;