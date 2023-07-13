import React from 'react';
import s from './textarea.module.scss';

type TextareaProps = {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
}

const Textarea = ({value, onChange, placeholder} : TextareaProps) => {
    return (
        <textarea className={s.textarea} placeholder={placeholder} value={value} onChange={onChange}/>
    );
};

export default Textarea;