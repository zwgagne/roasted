import React from "react";
import styled from "styled-components";




const FormNewMeetUp = (props) => {
    return (
        <>
            <h2>Nouveau Meetup</h2>
            <p>Utilisateur invité</p>
            <div>
                <img alt="Avatar icon" />
                <span>Edouard_Koffee</span>
            </div>
            <form>

                <label htmlFor="">Lieu de rencontre</label>
                <input type="text" placeholder="Nom de l'etablissement" />

                <label htmlFor="">Adresse</label>
                <input type="text" placeholder="Adresse et Ville" />

                <label htmlFor="">Date de la rencontre</label>
                <input type="date" placeholder="" />

                <label htmlFor="">Heure</label>
                <input type="time" placeholder="" />

                <button type="submit" onClick={props.functionLB3}>Imposer une Meetup</button>


            </form>
        </>
    )
}

export default FormNewMeetUp;