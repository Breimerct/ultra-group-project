import { FC, use, useEffect } from "react";
import LoginForm from "./components/LoginForm";

interface IProps {}

const LoginPage: FC<IProps> = () => {
    return (
        <section className="flex justify-center">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-10">
                <div>
                    <h1 className="text-5xl font-bold mb-3">Iniciar sesión</h1>
                    <p className="text-md">
                        Inicie sesión para acceder a su cuenta de Ultra Group
                    </p>
                </div>

                <LoginForm />
            </div>
        </section>
    );
};

export default LoginPage;
