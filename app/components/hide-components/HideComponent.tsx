"use client";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode;
    invert?: boolean;
}

const HideComponent: FC<IProps> = ({ children, invert }) => {
    const { user } = useAuthStore();

    if (invert) {
        return !!user ? null : <>{children}</>;
    }

    return !!user ? <>{children}</> : null;
};

export default HideComponent;
