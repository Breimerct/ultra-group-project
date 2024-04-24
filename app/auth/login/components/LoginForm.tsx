"use client";
import { FC } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ILogin } from "@services/auth.service";
import { useAuthStore } from "@store/auth-store/auth.store";
import Input from "@components/input/Input";

interface IProps {}

const LoginForm: FC<IProps> = () => {
    const router = useRouter();
    const { login } = useAuthStore();
    const initialValues: ILogin = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Dirección de Email invalida.")
            .required("El campo es requerido."),
        password: Yup.string().required("El campo es requerido."),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            login(values).then((res) => {
                if (res) {
                    resetForm();
                    router.push("/");
                }
            });
        },
    });

    return (
        <form className="flex flex-col mt-5 gap-5" onSubmit={formik.handleSubmit}>
            <div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Ingrese su email"
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    messageError={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
            </div>

            <div>
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    messageError={formik.errors.password}
                    {...formik.getFieldProps("password")}
                />
            </div>

            <div className="flex justify-end items-center text-emerald-900 font-medium underline">
                <a className="">Olvide mi contraseña</a>
            </div>

            <button
                type="submit"
                className="block w-full bg-emerald-800 text-white py-3 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all"
            >
                Iniciar sesión
            </button>

            <div className="flex justify-center items-center">
                ¿No tienes una cuenta?
                <Link
                    href="register"
                    className="text-emerald-900 font-medium underline pl-1"
                >
                    Registrate
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
