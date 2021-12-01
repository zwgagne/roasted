import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from 'react-countdown';
import { getRemainingTimeUntilMsTimestamp } from "./CountdownTimer";

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
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
            <span>
                <Days d={remainingTime.days} />

                <Hours t={remainingTime.hours} />
                <Minutes m={remainingTime.minutes} />
                <Secondes s={remainingTime.seconds} />
            </span>
        </>
    )
}

export default Timer;

//function Years(props) {
//    return (
//        <>
//            <span><b>{props.y}</b> A</span>
//        </>
//    )
//}

function Mounts(props) {
    return (
        <>
            <span><b> {props.M}</b> M</span>
        </>
    )
}

function Days(props) {
    return (
        <>
            <span><b> {props.d}</b> J</span>
        </>
    )
}

function Hours(props) {
    return (
        <>
            <span><b> {props.t}</b> H</span>
        </>
    )
}

function Minutes(props) {
    return (
        <>
            <span><b> {props.m}</b> M</span>
        </>
    )
}

function Secondes(props) {
    return (
        <>
            <span><b> {props.s}</b> S</span>
        </>
    )
}