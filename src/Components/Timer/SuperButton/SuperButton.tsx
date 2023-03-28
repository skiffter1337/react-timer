import React, {ReactNode} from 'react';

type SuperButtonType = {
    callback: () => void
    children: ReactNode
    disabled?: boolean
}

export const SuperButton: React.FC<SuperButtonType> = (props) => {
    const {callback, children, ...otherprops} = props

    const onClickHandler = () => callback()

    return <button onClick={onClickHandler} disabled={props.disabled}>{children}</button>
};
