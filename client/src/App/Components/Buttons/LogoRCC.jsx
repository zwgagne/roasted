import React from "react";
import { Link } from "react-router-dom";
import logoRC from "../../../Assets/Images/Logo/logoRoastedCoffe.svg"


const LogoRCC = () => {
    return (
        <>
            <div>
                <Link to="/">
                    <img src={logoRC} alt="Logo Roasted Coffe club" />
                </Link>
            </div>
        </>
    )
}

export default LogoRCC;