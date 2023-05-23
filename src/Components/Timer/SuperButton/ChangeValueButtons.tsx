import React from 'react';
import {SuperButton} from "Components/Timer/SuperButton/SuperButton";

type ChangeValueButtons = {
    updateTimer: (time: number) => void
}
export const ChangeValueButtons: React.FC<ChangeValueButtons> = ({updateTimer}) => {

    const timerValueButtonsConfig = [
        {label: "+1", callback: () => updateTimer(60)},
        {label: "+5", callback: () => updateTimer(300)},
        {label: "+15", callback: () => updateTimer(1500)},
        {label: "-15", callback: () => updateTimer(-1500)},
        {label: "-5", callback: () => updateTimer(-300)},
        {label: "-1", callback: () => updateTimer(-60)}
    ]

    const changeValueButtons = timerValueButtonsConfig.map(({label, callback}, index) => <SuperButton
        callback={callback} key={index}>{label}</SuperButton>)


    return <>{changeValueButtons}</>
};

