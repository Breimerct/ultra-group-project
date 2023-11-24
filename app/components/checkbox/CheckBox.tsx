"use client";
import React, { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    isInvalid?: boolean;
    messageError?: string;
}

const CheckBox: FC<IProps> = ({ label, isInvalid, messageError, ...props }) => {
    const classError = isInvalid ? "border-red-500 text-red-500 placeholder:text-red-500" : "border-zinc-400";
    const classlabelError = isInvalid ? "text-red-500" : null;
    const classLabelReadOnly = props.readOnly ? "text-zinc-600/70 pointer-events-none" : null;

    return (
        <>
            <div className="flex items-center gap-2">
                <label
                    className={`flex flex-nowrap gap-3 items-center cursor-pointer ${classlabelError} ${classLabelReadOnly}`}
                >
                    <input
                        readOnly
                        type="checkbox"
                        {...props}
                        className={`h-5 w-5 outline-none rounded-md border-2 border-solid read-only:border-zinc-500/20 read-only:text-zinc-600/70 read-only:pointer-events-none ${classError}`}
                    />
                    <span>{label}</span>
                </label>
            </div>
            {isInvalid && <span className="text-red-500 text-xs ml-2">{messageError}</span>}
        </>
    );
};

export default CheckBox;
