import React from "react";

interface IPasswordOption {
    label: string;
    type: string;
    name: string;
    min?: string | number;
    max?: string | number;
    defaultValue?: string | number;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordOption = (props: IPasswordOption) => {
    const {
        label,
        type,
        name,
        min,
        max,
        onChange,
        defaultValue,
        defaultChecked,
        disabled
    } = props;
    return (
        <div className="option">
            <label className='option-label'>{label}</label>
            <input
                type={type}
                name={name}
                min={min}
                max={max}
                defaultValue={defaultValue}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    )
}

export default PasswordOption;