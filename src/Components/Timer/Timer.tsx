import React, {useEffect} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import {SuperButton} from "./SuperButton/SuperButton";
import s from './Timer.module.css'
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "redux/store/store";
import {InitialStateType, timerActions} from "redux/store/timerReducer";

type TimerControlButtonsConfigType = {
    [key: number]: TimerControlButtonConfigType[]
}
type TimerControlButtonConfigType = {
    text: string
    callback: () => void
}

// Start adding RTK
export const Timer = () => {

    const dispatch = useAppDispatch()
    const timerState = useSelector<RootStateType, InitialStateType>(state => state.timer)
    let minutes = Math.floor(timerState.timeLeft / 60)
    let seconds = Math.floor((timerState.timeLeft - minutes * 60))


    // const [startTime, setStartTime] = useState<number>(0)
    // const [totalTime, setTotalTime] = useState<number>(0)
    // const [timeLeft, setTimeLeft] = useState(startTime * 60)
    // const [timerStatus, setTimerStatus] = useState(0)


    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (timerState.timerStatus === 1) {
            intervalId = setInterval(() => {
                dispatch(timerActions.setTimeLeft({ timeLeft: timerState.timeLeft >= 1 ? timerState.timeLeft - 1 : 0 }));
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [timerState.timeLeft, timerState.timerStatus]);



    // const [intervalId, setIntervalId] = useState(setInterval(() => {
    // }, 1000))
    //
    //
    // useEffect(() => {
    //     if (intervalId) {
    //         setIntervalId(setInterval(() => {
    //             timerState.timerStatus === 1 &&
    //             dispatch(timerActions.setTimeLeft({timeLeft: timerState.timeLeft >= 1 ? timerState.timeLeft - 1 : 0}))
    //         }, 1000))
    //     }
    //
    //     return () => {
    //         if (intervalId) {
    //             clearInterval(intervalId)
    //         }
    //     }
    // }, [timerState.timerStatus])

    useEffect(() => {
        timerState.totalTime > 3600 && dispatch(timerActions.setTotalTime({totalTime: 3600}))
    }, [timerState.totalTime])

    useEffect(() => {
        timerState.timeLeft >= 3600 && dispatch(timerActions.setTimeLeft({timeLeft: 3600}))

        if (timerState.timeLeft <= 0) {
           dispatch(timerActions.setTimeLeft({timeLeft: 0}))
            dispatch(timerActions.setTotalTime({totalTime: 0}))
            dispatch(timerActions.setTimerStatus({timerStatus: 0}))
        }

    }, [timerState.timeLeft])


    const start = () => dispatch(timerActions.startTimer())
    const stop = () => dispatch(timerActions.setTimerStatus({timerStatus: 2}))
    const resume = () => dispatch(timerActions.setTimerStatus({timerStatus: 1}))
    const reset = () => {
        dispatch(timerActions.setTimerStatus({timerStatus: 0}))
        dispatch(timerActions.setTimeLeft({timeLeft: 0}))
    }


    const updateTimer = (seconds: number) => {
        dispatch(timerActions.setTimeLeft({timeLeft: timerState.timeLeft + seconds}))
        dispatch(timerActions.setTotalTime({totalTime: timerState.totalTime + seconds}))
    }
    // const addOneMinute = () => updateTimer(60)
    // const addFiveMinutes = () => updateTimer(300)
    // const addFifteenMinutes = () => updateTimer(1500)
    // const removeFifteenMinutes = () => updateTimer(-1500)
    // const removeFiveMinutes = () => updateTimer(-300)
    // const removeOneMinute = () => updateTimer(-60)


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
        {label: "+1", callback: () => updateTimer(60)},
        {label: "+5", callback: () => updateTimer(300)},
        {label: "+15", callback: () => updateTimer(1500)},
        {label: "-15", callback: () =>updateTimer(-1500)},
        {label: "-5", callback: () => updateTimer(-300)},
        {label: "-1", callback: () => updateTimer(-60)}
    ]

    const controlButtons = timerControlButtonsConfig[timerState.timerStatus].map(({text, callback}, index) => <SuperButton
        callback={callback} key={index} disabled={timerState.timeLeft <= 0} xType={"control"}>{text}</SuperButton>)
    const changeValueButtons = timerValueButtonsConfig.map(({label, callback}, index) => <SuperButton
        callback={callback} key={index}>{label}</SuperButton>)


    const progressbarText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    const progressbarPercentage = timerState.timeLeft === 0 ? 0 : Math.round(timerState.timeLeft / timerState.totalTime * 100)


    return (
        <div className={s.timer}>
            <div className={s.timerBlock}>
                <CircularProgressbar value={progressbarPercentage} text={progressbarText} className={s.progressbar} styles={buildStyles({textColor: "#041e3a", pathColor: "#041e3a"})}/>
                <div className={s.buttonsContainer}>
                    <div className={s.controlButtons}>
                        {controlButtons}
                    </div>
                    <div className={s.changeValueButtons}>
                        {changeValueButtons}
                    </div>
                </div>
            </div>
        </div>
    );
};


