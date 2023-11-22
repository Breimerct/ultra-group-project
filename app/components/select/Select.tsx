import { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
    label: string;
    isInvalid?: boolean;
    messageError?: string;
}

const Select: FC<IProps> = ({
    label,
    className,
    isInvalid,
    messageError,
    ...props
}) => {
    const classError = isInvalid
        ? "border-red-500 text-red-500 placeholder:text-red-500"
        : "border-zinc-400";
    const classlabelError = isInvalid ? "text-red-500" : null;

    return (
        <>
            <label className={`block ${classlabelError}`}>{label}</label>
            <select
                {...props}
                className={`outline-none rounded-md border-2 border-solid p-2 w-full ${classError}`}
            >
                {props.children}
            </select>
            {isInvalid && (
                <span className="text-red-500 text-xs ml-2">
                    {messageError}
                </span>
            )}
        </>
    );
};

export default Select;
