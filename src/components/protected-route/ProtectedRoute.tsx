"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@store/user-store/user.store";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useCurrentUser();

    useEffect(() => {
        if (!user && !loading) {
            toast.info("Debe iniciar sesión para acceder a esta página.");
            redirect("/auth/login");
        }

        return () => {};
    }, [user, loading]);

    return <>{children}</>;
};

export default ProtectedRoute;
