import React from "react";
import styled from "styled-components";

const SpanPassedE = styled.span`
   font-weight: bold;
   margin-left: 8px;
`

const TimeOut = () => {
    return (
        <SpanPassedE>L'évènement est terminé!</SpanPassedE>
    )
}

export default TimeOut;