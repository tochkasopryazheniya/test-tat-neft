import React from 'react';
import s from './input.module.scss';

type InputProps = {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    type: string
}

const Input = ({value, onChange, placeholder, type}: InputProps) => {
    return (
        <input className={s.input} value={value} onChange={onChange} type={type} placeholder={placeholder}/>
    );
};

export default Input;