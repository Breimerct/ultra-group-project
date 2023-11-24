"use client";
import { Role } from "@/app/api/auth/auth.service";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

interface IProps {
    children: ReactNode;
    isUser?: boolean;
}

const ProtectByRol: FC<IProps> = ({ children, isUser = false }) => {
    const { user } = useAuthStore();

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
