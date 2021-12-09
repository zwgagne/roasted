import React, { useState, useEffect, useContext } from "react";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import Avatare from "../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import PostCard from "../Components/Main/PostCard";
import BtnAddFriend from "../Components/Buttons/AddFriend";
import { ReactComponent as Ecommercial } from "../../Assets/Images/Icons/Ecommercial.svg";
import AddFriendIcon from "../../Assets/Images/Icons/Add_Friend_Icon.svg";
import IconAccept from "../../Assets/Images/Icons/AcceptFR.svg";
import { parse } from "ipaddr.js";
import NewMeetup from "../Components/Buttons/NewMeetup";
import LightBox from "../Components/Main/LightBox";
import { ScoreLvl } from "../Contexts/ScoreLvl";

const MainProfil = styled.main`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   @media (min-width: 1985px) {
    padding: 36px 25%;
   }
   @media (max-width: 960px) {
    padding: 26px;
   }
`;
const ContainerCard = styled.section`
   background-color: #FFFCF7;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
   margin: 56px 0px 48px 0px;
   width: 866px;
   padding: 50px 26px;
   border-radius: 20px;
   box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
   @media (max-width: 960px) {
    width: 70%;
    padding: 20px;
    justify-content: left;
  }
  @media (max-width: 660px) {
    width: 100%;
    padding: 20px;
  }
`;

const ArticleUserAction = styled.article`
   display: flex;
   flex-wrap: wrap;
`

const ContainerSpan1 = styled.span`
   margin-left: 18px;
   display: flex;
   flex-wrap: wrap;
   width: 300px;
   @media (max-width: 960px) {
       width: 70%;
   }
   @media (max-width: 574px) {
        width: 75%;
   }
   @media (max-width: 540px) {
        width: 70%;
   }
`

const SpanUserName = styled.span`
   font-size: 32px;
   margin-left: 10px;
   width: 80%;
   @media (max-width: 960px) {
       width: 50%;
  }
`
const AvatareUser = styled.img`
   width: 90px;
`;

const ArticleUserStats = styled.div`
   border-left: 2px solid #EEDDBE;
   @media (max-width: 960px) {
       margin-top: 40px;  
    }
`;

const SpanStatUserNum = styled.div`
   font-size: 44px;
   font-weight: bold;
   margin-left: 20px;
   margin-right: 17px;
`;
const SpanStatTitle = styled.div`
   font-size: 16px;
   align-self: center;
`;
const DivContainerStatInfo = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
`;

const NameButton = styled.span`
   font-size: 16px;
   font-weight: bold;
   margin-left: 10px;
   @media (max-width: 574px) {
       width: 100%;
  }
`;

const LightBoxBG = styled.div`
   position: absolute;
   z-index: 1;
   display: flex;
   justify-content: center;
   backdrop-filter: blur(1px);
   overflow: hidden;
   background-color: #00000040;
   width: 100%;
   height: 100%;
`;

const SpanPts = styled.span`
   font-size: 14px;
`;

const PublicProfilScreen = (props) => {
    const [inputs, setInputs] = useState({ name: "" });
    const [isFriend, setIsFriend] = useState(true);
    const { score, setScore } = useContext(ScoreLvl)
    const [meetUpFormLB, setMeetUpFormLB] = useState(false)
    const { name } = inputs;

    async function getPublicUserInfo() {
        try {
            const params = new URLSearchParams(window.location.search);
            const userName = params.get("user")
            const response = await fetch(`http://localhost:5000/profile/public/${userName}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setInputs({
                name: parseRes.infos
            });
            setIsFriend(parseRes.isFriend)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getPublicUserInfo();
    }, [])

    const Grade = () => {
        let pts = 40 // Fetch le score du User de la DB ICI
        if (pts >= 0 && pts <= 5) {
            return (
                <>Débutant</>
            )
        }
        if (pts >= 6 && pts <= 25) {
            return (
                <>Apprenti</>
            )
        }
        if (pts >= 26 && pts <= 50) {
            return (
                <>Connaisseur</>
            )
        }
        if (pts >= 51 ) {
            return (
                <>Maître torréfacteur</>
            )
        }
    }



    return (
        <>
            {meetUpFormLB && <LightBoxBG>
                <LightBox functionLB2={() => setMeetUpFormLB(false)}/>
            </LightBoxBG>}
            <NavHeader />
            <MainProfil>
                <ContainerCard>
                    <ArticleUserAction>
                        <AvatareUser src={Avatare} />
                        <ContainerSpan1>
                            <Ecommercial />
                            <SpanUserName>{name}</SpanUserName>
                            <NameButton>
                                {!isFriend ? <BtnAddFriend to={name} icon={AddFriendIcon} NameBtn="Ajouter" /> : <BtnAddFriend etat="true" to={name} icon={IconAccept} NameBtn="Vous êtes ami" />}
                                {isFriend && <NewMeetup functionLB={() => setMeetUpFormLB(true)} />}
                            </NameButton>
                        </ContainerSpan1>
                    </ArticleUserAction>
                    <ArticleUserStats>
                        <div>
                            <DivContainerStatInfo>
                                <SpanStatUserNum>{localStorage.score} <SpanPts>pts</SpanPts></SpanStatUserNum>
                                <SpanStatTitle>{Grade()}</SpanStatTitle>
                            </DivContainerStatInfo>
                            <DivContainerStatInfo>
                                <SpanStatUserNum>123</SpanStatUserNum>
                                <SpanStatTitle>Bean Buddies</SpanStatTitle>
                            </DivContainerStatInfo>
                        </div>
                    </ArticleUserStats>
                </ContainerCard>
            </MainProfil>
        </>
    )
}

export default PublicProfilScreen;