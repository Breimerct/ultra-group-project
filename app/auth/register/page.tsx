import Link from "next/link";
import { FC } from "react";

const RegisterPage: FC = () => {
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl p-10">
                <div>
                    <h1 className="text-5xl font-bold">Sign up</h1>
                    <p className="text-md">
                        Let’s get you all set up so you can access your personal
                        account.
                    </p>
                </div>

                <form className="grid grid-cols-2 mt-5 gap-5">
                    <div className="col-span-2">
                        <label className="block">Nombre completo</label>
                        <input
                            type="text"
                            placeholder="ingrese su nombre completo"
                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block">E-mail</label>
                        <input
                            type="email"
                            placeholder="ingresa tu correo electronico"
                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block">Número de telefono</label>
                        <input
                            type="tel"
                            placeholder="Ingresa tu numero celular"
                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block">Contraseña</label>
                        <input
                            type="password"
                            placeholder="ingrese su contraseña"
                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block">Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="confirme su contraseña"
                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="flex flex-nowrap justify-start items-center cursor-pointer">
                            <input
                                type="checkbox"
                                placeholder="enter your password"
                                className="mr-2"
                            />
                            I agree to all the
                            <span className="text-emerald-900 font-medium underline mx-1">
                                Terms
                            </span>{" "}
                            and
                            <span className="text-emerald-900 font-medium underline ml-1">
                                Privacy Policies
                            </span>
                        </label>
                    </div>

                    <button className="block w-full col-span-2 bg-emerald-800 text-white py-3 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all">
                        Registarme
                    </button>

                    <div className="flex justify-center items-center col-span-2">
                        Already have an account?
                        <Link
                            href="login"
                            className="text-emerald-900 font-medium underline pl-1"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
