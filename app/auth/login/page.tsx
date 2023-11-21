import { FC, use, useEffect } from "react";
import LoginForm from "./components/LoginForm";

interface IProps {}

const LoginPage: FC<IProps> = () => {
    return (
        <section className="flex justify-center lg:justify-end">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-10">
                <div>
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="text-md">
                        Login to access your Phnes.Travels account
                    </p>
                </div>

                <LoginForm />
            </div>
        </section>
    );
};

export default LoginPage;
