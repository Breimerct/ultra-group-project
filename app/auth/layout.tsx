import { FC, ReactNode, createElement } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth",
    description: "Auth layout",
};

interface IProps {
    children: ReactNode;
}

const LoginLayout: FC<IProps> = ({ children }) => {
    return (
        <main
            className="bg-gray-100 min-h-screen object-cover bg-no-repeat bg-cover bg-center grid grid-cols-1 lg:grid-cols-2 items-center lg:py-20 lg:px-10"
            style={{ backgroundImage: "url(/background-login.webp)" }}
        >
            <div>
                <h1 className="text-4xl font-bold text-white text-center">
                    Agencia de viajes
                    <span className="block text-emerald-500">Ultra Group</span>
                </h1>
            </div>

            {children}
        </main>
    );
};

export default LoginLayout;
