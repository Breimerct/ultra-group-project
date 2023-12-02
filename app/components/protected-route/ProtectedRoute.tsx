"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/user-store/user.store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            toast.info("Debe iniciar sesión para acceder a esta página.");
            redirect("/auth/login");
        }

        return () => {};
    }, [user]);

    return <>{children}</>;
};

export default ProtectedRoute;
