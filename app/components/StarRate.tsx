import { FC } from "react";
import { StartIcon } from "./Icons";

interface IProps {
    size?: number;
    startPosition?: StartPosition;
}

export enum StartPosition {
    // eslint-disable-next-line no-unused-vars
    LEFT = "justify-start",
    // eslint-disable-next-line no-unused-vars
    RIGHT = "justify-end",
}

const StarRate: FC<IProps> = ({ size = 1, startPosition = StartPosition.RIGHT }) => {
    return (
        <p className={`text-2xl mt-2 w-full flex flex-nowrap gap-2 text-yellow-400 ${startPosition}`}>
            {Array.from({
                length: size,
            }).map((_, index) => (
                <StartIcon key={index} />
            ))}
        </p>
    );
};

export default StarRate;
