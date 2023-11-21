import { FC } from "react";
import { StartIcon } from "./Icons";

interface IProps {
    size?: number;
    className?: string;
}

const StarRate: FC<IProps> = ({ className, size = 1 }) => {
    return (
        <p
            className={`text-2xl mt-2 w-full flex justify-end flex-nowrap gap-2 text-yellow-400`}
        >
            {Array.from({
                length: size,
            }).map((_, index) => (
                <StartIcon key={index} />
            ))}
        </p>
    );
};

export default StarRate;
