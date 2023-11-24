import { FC, ReactNode } from "react";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import ProtectByRol from "../components/protect-by-rol/ProtectByRol";
import Header from "../components/header/Header";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <>
            <Header className="w-full bg-zinc-100 py-2 text-black" />

            <div className="container mx-auto p-2 mt-3">
                <ProtectedRoute>
                    <ProtectByRol>{children}</ProtectByRol>
                </ProtectedRoute>
            </div>
        </>
    );
};

export default DashboardLayout;
