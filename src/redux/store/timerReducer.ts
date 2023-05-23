import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    startTime: number
    totalTime: number
    timeLeft: number
    timerStatus: number

}

const initialState: InitialStateType = {
    startTime: 0,
    totalTime: 0,
    timeLeft: 0,
    timerStatus: 0,
}


const slice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state, action: PayloadAction) => {
            debugger
            state.timerStatus = 1
            state.totalTime = state.timeLeft
        },
        setTimeLeft: (state, action: PayloadAction<{timeLeft: number}>) => {
            state.timeLeft = action.payload.timeLeft
        },
        setTotalTime: (state, action: PayloadAction<{totalTime: number}>) => {
            state.totalTime = action.payload.totalTime
        },
        setTimerStatus: (state, action: PayloadAction<{timerStatus: number}>) => {
            state.timerStatus = action.payload.timerStatus
        }
    }
})

export const timerReducer = slice.reducer

export const timerActions = slice.actions