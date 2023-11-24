import { FC, ReactNode } from "react";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import ProtectByRol from "../components/protect-by-rol/ProtectByRol";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="container mx-auto">
                <ProtectByRol>
                    <ProtectedRoute>{children}</ProtectedRoute>
                </ProtectByRol>
            </div>
        </div>
    );
};

export default DashboardLayout;
