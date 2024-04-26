"use client";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";
import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode;
    invert?: boolean;
}

const HideComponent: FC<IProps> = ({ children, invert }) => {
    const {user} = useCurrentUser();

    if (invert) {
        return !!user ? null : <>{children}</>;
    }

    return !!user ? <>{children}</> : null;
};

export default HideComponent;
