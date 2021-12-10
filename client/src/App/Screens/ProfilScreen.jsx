import React, { useState, useEffect } from "react";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import Avatare from "../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import PostCard from "../Components/Main/PostCard";
import EditProfil from "../Components/Main/EditProfil";
import { ReactComponent as Ecommercial } from "../../Assets/Images/Icons/Ecommercial.svg";
import { ReactComponent as EditIcon } from "../../Assets/Images/Icons/Edit.svg";

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
       width: 50%;
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
   font-size: 40px;
   font-weight: bold;
   margin-left: 20px;
   margin-right: 17px;
`;
const SpanPts = styled.span`
   font-size: 14px;
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
const EditProfilBtn = styled.button`
   background-color: #EEDDBE;
   padding: 10px 15px;
   border-radius: 40px;
   border: none;
   cursor: pointer;
   &:hover{
       background-color: #f3e9d7;
   }
`;
const NameButton = styled.span`
   font-size: 16px;
   font-weight: bold;
   margin-left: 10px;
`;

const ProfilScreen = () => {
    const [Edit, SetEdit] = useState(false)
    const [inputs, setInputs] = useState({ name: "" })
    const [posts, setPosts] = useState([]);
    const [points, setPoints] = useState([]);
    const { name } = inputs;

    async function getUserInfo() {
        try {
            const response = await fetch("http://localhost:5000/profile/edit", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setInputs({
                email: parseRes.user_email,
                name: parseRes.user_name
            });
            setPoints(parseRes.user_points)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUserInfo();
        getUserPosts();
    }, [])

    async function getUserPosts() {
        try {
            const response = await fetch("http://localhost:5000/posts/user-posts", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setPosts(parseRes.rows);
        } catch (err) {
            console.error(err.message)
        }
    }

    const Grade = () => {
        let pts = points
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
        console.log(pts)
    }

    return (
        <>
            <NavHeader />
            <MainProfil>
                <ContainerCard>
                    <ArticleUserAction>
                        <AvatareUser src={Avatare} />
                        <ContainerSpan1>
                            <Ecommercial />
                            <SpanUserName>{name}</SpanUserName>
                            <EditProfilBtn onClick={() => SetEdit(!Edit)}>
                                <EditIcon />
                                <NameButton>Édit Profile</NameButton>
                            </EditProfilBtn>
                        </ContainerSpan1>
                    </ArticleUserAction>
                    <ArticleUserStats>
                        <div>
                            <DivContainerStatInfo>
                                <SpanStatUserNum>{points} <SpanPts>pts</SpanPts></SpanStatUserNum>
                                <SpanStatTitle>{Grade()}</SpanStatTitle>
                            </DivContainerStatInfo>
                            <DivContainerStatInfo>
                                <SpanStatUserNum>123</SpanStatUserNum>
                                <SpanStatTitle>Bean Buddies</SpanStatTitle>
                            </DivContainerStatInfo>
                        </div>
                    </ArticleUserStats>
                    {Edit && <EditProfil />}
                </ContainerCard>
                {posts.map((post) => (
                    <PostCard key={post.post_id} img={Avatare} userName={post.user_name} datePosted={post.created_at.slice(0, 10)} commentPosted={post.post_content} />
                ))}
            </MainProfil>
        </>
    )
}

export default ProfilScreen;