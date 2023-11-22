import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode;
    isUser?: boolean;
}

const ProtectByRol: FC<IProps> = ({ children, isUser = false }) => {
    const { user } = useAuthStore();

    if (!user) {
        return null;
    }

    if (isUser && user.role === "user") {
        return <>{children}</>;
    }

    if (!isUser && user.role === "admin") {
        return <>{children}</>;
    }

    return null;
};

export default ProtectByRol;
