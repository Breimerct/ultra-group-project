import { FC } from "react";
import RegisterForm from "./components/RegisterForm";

const RegisterPage: FC = () => {
    return (
        <section className="flex justify-center">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-10">
                <div>
                    <h1 className="text-5xl font-bold mb-3">
                        Regístrate ahora
                    </h1>
                    <p className="text-md">
                        Vamos a configurarlo todo para que pueda acceder a su
                        cuenta personal.
                    </p>
                </div>

                <RegisterForm />
            </div>
        </section>
    );
};

export default RegisterPage;
