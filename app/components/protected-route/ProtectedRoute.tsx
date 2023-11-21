"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/app/store/auth-store/auth.store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            redirect("/auth/login");
        }

        return () => {};
    }, [user]);

    return <>{children}</>;
};

export default ProtectedRoute;
