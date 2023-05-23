import {AnyAction, combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {timerReducer} from "redux/store/timerReducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    timer: timerReducer
})

export const store = configureStore({
reducer: rootReducer
})


export type RootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>