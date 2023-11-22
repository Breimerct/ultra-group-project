"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthStore();

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
