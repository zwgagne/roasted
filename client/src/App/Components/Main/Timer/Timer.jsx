import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRemainingTimeUntilMsTimestamp } from "./CountdownTimer";
import TimeOut from "./TimeOut";

const SpanTimer = styled.span`
   margin-left: 8px;
`;

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
    passed: false
}

const Timer = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return (
        <>
            {!remainingTime.passed && <SpanTimer> Dans
                <Days d={remainingTime.days} /> et
                <Hours t={remainingTime.hours} />
                <Minutes m={remainingTime.minutes} />
                <Secondes s={remainingTime.seconds} />
            </SpanTimer>}
            {remainingTime.passed && <TimeOut />}
        </>
    )
}

export default Timer;

function Days(props) {
    return (
        <>
            <span><b> {props.d}</b> Jour(s)</span>
        </>
    )
}

function Hours(props) {
    return (
        <>
            <span><b> {props.t} :</b></span>
        </>
    )
}

function Minutes(props) {
    return (
        <>
            <span><b> {props.m}</b> min</span>
        </>
    )
}

function Secondes(props) {
    return (
        <>
            <span><b> {props.s}</b> sec</span>
        </>
    )
}