import React, {ReactNode} from 'react';
import s from '../Timer.module.css'

type SuperButtonType = {
    callback: () => void
    children: ReactNode
    disabled?: boolean
    xType?: string
}

export const SuperButton: React.FC<SuperButtonType> = (props) => {
    const {callback, children, xType, ...otherprops} = props

    const finalClassname =  `${xType === "control" ? s.controlButton :  s.changeValueButton}`
    const onClickHandler = () => callback()

    return <button onClick={onClickHandler} disabled={props.disabled} className={finalClassname}>{children}</button>
};
