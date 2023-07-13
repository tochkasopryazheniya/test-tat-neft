import React, { useState } from 'react';

type UseInputProps = {
    initialValue: string;
}

const useTextarea= ({ initialValue }: UseInputProps) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    const reset = () => {
        setValue(initialValue)
    }

    return {
        value,
        onChange: handleChange,
        reset
    };
};

export default useTextarea;