import React, {useCallback, useEffect} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import s from './Timer.module.css'
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "redux/store/store";
import {InitialStateType, timerActions} from "redux/store/timerReducer";
import {ControlButtons} from "Components/Timer/SuperButton/СontrolButtons";
import {ChangeValueButtons} from "Components/Timer/SuperButton/ChangeValueButtons";



export const Timer = () => {

    const dispatch = useAppDispatch()
    const timerState = useSelector<RootStateType, InitialStateType>(state => state.timer)
    let minutes = Math.floor(timerState.timeLeft / 60)
    let seconds = Math.floor((timerState.timeLeft - minutes * 60))


    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (timerState.timerStatus === 1) {
            intervalId = setInterval(() => {
                dispatch(timerActions.setTimeLeft({timeLeft: timerState.timeLeft >= 1 ? timerState.timeLeft - 1 : 0}));
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [timerState.timeLeft, timerState.timerStatus]);


    useEffect(() => {
        if (timerState.totalTime > 3600) dispatch(timerActions.setTotalTime({totalTime: 3600}))

        if (timerState.timeLeft >= 3600) dispatch(timerActions.setTimeLeft({timeLeft: 3600}))

        if (timerState.timeLeft <= 0) {
            dispatch(timerActions.setTimeLeft({timeLeft: 0}))
            dispatch(timerActions.setTotalTime({totalTime: 0}))
            dispatch(timerActions.setTimerStatus({timerStatus: 0}))
        }
    }, [dispatch, timerState.totalTime, timerState.timeLeft])


    const start = useCallback(() => dispatch(timerActions.startTimer()), [dispatch])
    const stop = useCallback(() => dispatch(timerActions.setTimerStatus({timerStatus: 2})), [dispatch])
    const resume = useCallback(() => dispatch(timerActions.setTimerStatus({timerStatus: 1})), [dispatch])
    const reset = useCallback(() => {
        dispatch(timerActions.setTimerStatus({timerStatus: 0}))
        dispatch(timerActions.setTimeLeft({timeLeft: 0}))
    }, [dispatch])
    const updateTimer = useCallback((seconds: number) => {
        dispatch(timerActions.setTimeLeft({timeLeft: timerState.timeLeft + seconds}))
        dispatch(timerActions.setTotalTime({totalTime: timerState.totalTime + seconds}))
    }, [dispatch])


    const progressbarText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    const progressbarPercentage = timerState.timeLeft === 0 ? 0 : Math.round(timerState.timeLeft / timerState.totalTime * 100)

    return (
        <div className={s.timer}>
            <div className={s.timerBlock}>
                <CircularProgressbar value={progressbarPercentage} text={progressbarText} className={s.progressbar}
                                     styles={buildStyles({textColor: "#041e3a", pathColor: "#041e3a"})}/>
                <div className={s.buttonsContainer}>
                    <div className={s.controlButtons}>
                        <ControlButtons callback={{start, stop, reset, resume}}/>
                    </div>
                    <div className={s.changeValueButtons}>
                        <ChangeValueButtons updateTimer={updateTimer}/>
                    </div>
                </div>
            </div>
        </div>
    );
};




