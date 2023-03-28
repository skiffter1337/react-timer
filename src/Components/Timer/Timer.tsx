import React, {useEffect, useState} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import {SuperButton} from "./SuperButton/SuperButton";
import {Settings} from "./Settings/Settings";
import s from './Timer.module.css'


export const Timer = () => {


    const [timeLeft, setTimeLeft] = useState(55 * 60)
    const [isStarted, setIsStarted] = useState(false)
    const [intervalId, setIntervalId] = useState(setInterval(()=> {}, 1000))

    let minutes = Math.floor(timeLeft / 60)
    let seconds = Math.floor((timeLeft - minutes * 60))

    useEffect(() => {
        if(intervalId) {
       setIntervalId(setInterval(() => {
            isStarted &&
            setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
        }, 1000))
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isStarted])

    useEffect(() => {
        if(timeLeft >= 3600) {
            setTimeLeft(3600)
        }
        if(timeLeft < 0) {
            setTimeLeft(0)
        }
    }, [timeLeft])


const start = () => {
    setIsStarted(true)
}
const stop = () => {
        clearInterval(intervalId)
        setIsStarted(false)
}
const addOneMinute = () => {
setTimeLeft(timeLeft + 60)
}
const addFiveMinute = () => {
setTimeLeft(timeLeft + 300)
}
const addFiftenMinute = () => {
setTimeLeft(timeLeft + 1500)
}
const removeFiftenMinute = () => {
setTimeLeft(timeLeft - 1500)
}

    return (
        <div>
            <div>
                <span>{minutes.toString().padStart(2, "0")}</span>{":"}
                <span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <div className={s.buttonsContainer}>
                <SuperButton callback={start}>Start</SuperButton>
                <SuperButton callback={stop}>Stop</SuperButton>
                <SuperButton callback={addOneMinute}>+1 min</SuperButton>
                <SuperButton callback={addFiveMinute}>+5 min</SuperButton>
                <SuperButton callback={addFiftenMinute}>+15 min</SuperButton>
                <SuperButton callback={removeFiftenMinute}>-15 min</SuperButton>
            </div>
            <Settings/>
        </div>
    );
};


