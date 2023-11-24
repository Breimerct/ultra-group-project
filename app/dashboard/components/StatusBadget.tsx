import { FC, ReactNode } from "react";

interface StatusBadgetProps {
    status: boolean;
    children?: ReactNode;
}

const StatusBadget: FC<StatusBadgetProps> = ({ status, children }) => {
    const color = status ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200";
    return (
        <span
            className={`inline-flex items-center justify-center px-7 py-3 text-xs font-bold leading-none ${color} rounded-md`}
        >
            {children}
        </span>
    );
};

export default StatusBadget;
