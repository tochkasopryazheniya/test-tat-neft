import React, {ReactNode} from 'react';
import s from './button.module.scss';

type ButtonTypeProps = {
    children: ReactNode,
    red?: boolean,
    onClick: () => void,
    disabled?: boolean
}

const Button = ({children, red, onClick, disabled}: ButtonTypeProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${s.button} ${red ? s.red : ''}`}>{children}</button>
    );
};

export default Button;