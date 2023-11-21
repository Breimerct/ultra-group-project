"use client";
import { ILogin, useAuthStore } from "@/app/store/auth.store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FC, FormEvent, use, useEffect, useState } from "react";

interface IProps {}

const LoginForm: FC<IProps> = () => {
    const { login, user } = useAuthStore();
    const [form, setForm] = useState<ILogin>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            redirect("/");
        }

        return () => {};
    }, [user]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(form);
    };

    return (
        <form className="flex flex-col mt-5 gap-5" onSubmit={handleSubmitLogin}>
            <div>
                <label className="block">Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="enter your email"
                    className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                    value={form.email}
                    onChange={handleChangeInput}
                />
            </div>

            <div>
                <label className="block">password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                    value={form.password}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="flex justify-end items-center text-emerald-900 font-medium underline">
                <a className="">forgot your password</a>
            </div>

            <button className="block w-full bg-emerald-800 text-white py-3 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all">
                login
            </button>

            <div className="flex justify-center items-center">
                Don’t have an account?
                <Link
                    href="register"
                    className="text-emerald-900 font-medium underline pl-1"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
