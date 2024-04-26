"use client";
import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@store/user-store/user.store";
import { Role } from "@/types";

interface IProps {
    children: ReactNode;
    isUser?: boolean;
}

const ProtectByRol: FC<IProps> = ({ children, isUser = false }) => {
    const { user } = useUserStore();

    if (!user) {
        return null;
    }

    if (isUser && user.role === Role.User) {
        return <>{children}</>;
    }

    if (!isUser && user.role === Role.User) {
        toast.error("No tienes permisos para acceder a esta página");
        return notFound();
    }

    if (!isUser && user.role === Role.Admin) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectByRol;
