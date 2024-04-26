"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/user-store/user.store";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useCurrentUser();

    useEffect(() => {
        // const storedUser = JSON.parse(sessionStorage?.user || "null");

        if (!user) {
            toast.info("Debe iniciar sesión para acceder a esta página.");
            redirect("/auth/login");
        }

        return () => {};
    }, [user]);

    return <>{children}</>;
};

export default ProtectedRoute;
