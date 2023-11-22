import { FC, ReactNode } from "react";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import { Metadata } from "next";

interface IProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: "Ultra Group - Booking",
    description: "travel agency and tourism - booking",
    keywords: "travel, tourism, agency, ultra, group, booking",
};

const BookingLayout: FC<IProps> = ({ children }) => {
    return (
        <div>
            <ProtectedRoute>{children}</ProtectedRoute>
        </div>
    );
};

export default BookingLayout;
