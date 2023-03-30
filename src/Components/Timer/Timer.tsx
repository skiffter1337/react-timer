import React, {useEffect, useState} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import {SuperButton} from "./SuperButton/SuperButton";
import {Settings} from "./Settings/Settings";
import s from './Timer.module.css'
import {CircularProgressbar} from "react-circular-progressbar";

type TimerControlButtonsConfigType = {
    [key: number]: TimerControlButtonConfigType[]
}
type TimerControlButtonConfigType = {
    text: string
    callback: () => void
}

export const Timer = () => {

    const [startTime, setStartTime] = useState<number>(0)
    const [totalTime, setTotalTime] = useState<number>(0)
    const [timeLeft, setTimeLeft] = useState(startTime * 60)
    const [timerStatus, setTimerStatus] = useState(0)
    const [intervalId, setIntervalId] = useState(setInterval(() => {
    }, 1000))

    let minutes = Math.floor(timeLeft / 60)
    let seconds = Math.floor((timeLeft - minutes * 60))

    useEffect(() => {
        if (intervalId) {
            setIntervalId(setInterval(() => {
                timerStatus === 1 &&
                setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
            }, 100))
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [timerStatus])

    useEffect(() => {
        totalTime > 3600 && setTotalTime(3600)
    }, [totalTime])

    useEffect(() => {
        timeLeft >= 3600 && setTimeLeft(3600)

        if (timeLeft <= 0) {
            setTimeLeft(0)
            setTotalTime(0)
            setTimerStatus(0)
        }

    }, [timeLeft])


    const start = () => {
        clearInterval(intervalId)
        setTimerStatus(1)
        setTotalTime(timeLeft)
    }

    const stop = () => {
        clearInterval(intervalId)
        setTimerStatus(2)
    }

    const resume = () => setTimerStatus(1)

    const reset = () => {
        clearInterval(intervalId)
        setTimerStatus(0)
        setTimeLeft(0)
    }


    const updateTimer = (seconds: number) => {
        setTimeLeft(timeLeft + seconds)
        setTotalTime(totalTime + seconds)
    }
    const addOneMinute = () => updateTimer(60)
    const addFiveMinutes = () => updateTimer(300)
    const addFifteenMinutes = () => updateTimer(1500)
    const removeFifteenMinutes = () => updateTimer(-1500)
    const removeFiveMinutes = () => updateTimer(-300)
    const removeOneMinute = () => updateTimer(-60)


    const timerControlButtonsConfig: TimerControlButtonsConfigType = {
        0: [
            {text: "Start", callback: start},
            {text: "Reset", callback: reset},
        ],
        1: [
            {text: "Stop", callback: stop},
            {text: "Reset", callback: reset},
        ],
        2: [
            {text: "Resume", callback: resume},
            {text: "Reset", callback: reset},
        ]
    }
    const timerValueButtonsConfig = [
        {label: "+1 min", callback: addOneMinute},
        {label: "+5 min", callback: addFiveMinutes},
        {label: "+15 min", callback: addFifteenMinutes},
        {label: "-15 min", callback: removeFifteenMinutes},
        {label: "-5 min", callback: removeFiveMinutes},
        {label: "-1 min", callback: removeOneMinute}
    ]

    const controlButtons = timerControlButtonsConfig[timerStatus].map(({text, callback}, index) => <SuperButton
        callback={callback} key={index} disabled={timeLeft <= 0}>{text}</SuperButton>)
    const changeValueButtons = timerValueButtonsConfig.map(({label, callback}, index) => <SuperButton
        callback={callback} key={index}>{label}</SuperButton>)


    const progressbarText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    const progressbarPercentage = timeLeft === 0 ? 0 : Math.round(timeLeft / totalTime * 100)

    return (
        <div>
            <CircularProgressbar value={progressbarPercentage} text={progressbarText} className={s.progressbar}/>
            <div className={s.buttonsContainer}>
                <div className={s.controlButtons}>
                    {controlButtons}
                </div>
                <div>
                    {changeValueButtons}
                </div>
            </div>
            <Settings/>
        </div>
    );
};


