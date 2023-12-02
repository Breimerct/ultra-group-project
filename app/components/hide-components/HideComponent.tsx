"use client";
import { useUserStore } from "@/app/store/user-store/user.store";
import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode;
    invert?: boolean;
}

const HideComponent: FC<IProps> = ({ children, invert }) => {
    const { user } = useUserStore();

    if (invert) {
        return !!user ? null : <>{children}</>;
    }

    return !!user ? <>{children}</> : null;
};

export default HideComponent;
