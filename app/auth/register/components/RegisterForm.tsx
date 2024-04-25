"use client";
import Link from "next/link";
import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { DOCUMENTS_TYPE } from "@/const/mocks";
import { useAuthStore } from "@store/auth-store/auth.store";
import Select from "@components/select/Select";
import Input from "@components/input/Input";
import { Gender, IUser } from "@/types";

const RegisterForm: FC = () => {
    const { register } = useAuthStore();
    const router = useRouter();

    const initialValues = {
        name: "",
        email: "",
        cellphone: "",
        password: "",
        confirmPassword: "",
        terms: false,
        gender: "",
        documentType: "",
        documentNumber: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("El campo es requerido."),
        cellphone: Yup.string().required("El campo es requerido."),
        email: Yup.string()
            .email("Dirección de Email invalida.")
            .required("El campo es requerido."),
        password: Yup.string()
            .min(8, "Minimo debe tener 8 caracteres o más.")
            .required("El campo es requerido."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
            .required("El campo es requerido."),
        terms: Yup.boolean().oneOf([true], "Debe aceptar los terminos y condiciones."),
        gender: Yup.string().required("El genero es obligatorio"),
        documentType: Yup.string().required("El tipo de documento es obligatorio"),
        documentNumber: Yup.string().required("El numero de documento es obligatorio"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const user: IUser = {
                name: values.name,
                email: values.email,
                cellphone: values.cellphone,
                password: values.password,
                gender: values.gender,
                documentType: values.documentType,
                documentNumber: values.documentNumber,
            };

            register(user).then((res) => {
                if (res) {
                    resetForm();
                    router.push("/");
                }
            });
        },
    });

    return (
        <form className="grid grid-cols-2 mt-5 gap-3" onSubmit={formik.handleSubmit}>
            <div className="col-span-1">
                <Input
                    label="Nombre completo"
                    type="text"
                    placeholder="ingrese su nombre completo"
                    className="border-red-500 [label]:text-red-500"
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    messageError={formik.errors.name}
                    {...formik.getFieldProps("name")}
                />
            </div>

            <div className="col-span-1">
                <Input
                    label="Email"
                    type="email"
                    placeholder="ingrese su correo electronico"
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    messageError={formik.errors.email}
                    {...formik.getFieldProps("email")}
                />
            </div>

            <div className="col-span-1">
                <Input
                    label="Número de telefono"
                    type="text"
                    placeholder="ingresa tu número celular"
                    isInvalid={formik.touched.cellphone && !!formik.errors.cellphone}
                    messageError={formik.errors.cellphone}
                    {...formik.getFieldProps("cellphone")}
                />
            </div>

            <div className="col-span-1">
                <Select
                    label="Genero"
                    isInvalid={formik.touched.gender && !!formik.errors.gender}
                    messageError={formik.errors.gender}
                    {...formik.getFieldProps("gender")}
                >
                    <option value="">Genero</option>
                    <option value={Gender.Male}>Masculino</option>
                    <option value={Gender.Male}>Femenino</option>
                </Select>
            </div>

            <div className="col-span-1">
                <Select
                    label="Tipo de documento"
                    isInvalid={
                        formik.touched.documentType && !!formik.errors.documentType
                    }
                    messageError={formik.errors.documentType}
                    {...formik.getFieldProps("documentType")}
                >
                    <>
                        <option value="">Tipo de documento</option>
                        {DOCUMENTS_TYPE.map((document, index) => (
                            <option key={index} value={document.id}>
                                {document.name}
                            </option>
                        ))}
                    </>
                </Select>
            </div>

            <div className="col-span-1">
                <Input
                    label="Numero de documento"
                    type="text"
                    isInvalid={
                        formik.touched.documentNumber && !!formik.errors.documentNumber
                    }
                    messageError={formik.errors.documentNumber}
                    placeholder="Ingrese su documento"
                    {...formik.getFieldProps("documentNumber")}
                />
            </div>

            <div className="col-span-2">
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="ingrese sucontraseña"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    messageError={formik.errors.password}
                    {...formik.getFieldProps("password")}
                />
            </div>

            <div className="col-span-2">
                <Input
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="confirme su contraseña"
                    isInvalid={
                        formik.touched.confirmPassword && !!formik.errors.confirmPassword
                    }
                    messageError={formik.errors.confirmPassword}
                    {...formik.getFieldProps("confirmPassword")}
                />
            </div>

            <div className="col-span-2 my-3">
                <label className="flex flex-nowrap justify-start items-center cursor-pointer text-xs">
                    <input
                        type="checkbox"
                        placeholder="enter your password"
                        className="mr-2"
                        {...formik.getFieldProps("terms")}
                    />
                    Estoy de acuerdo con todos los
                    <span className="text-emerald-900 font-medium underline mx-1">
                        Terminos
                    </span>
                    y
                    <span className="text-emerald-900 font-medium underline ml-1 inline-block">
                        Políticas de privacidad
                    </span>
                </label>
                {formik.touched.terms && !!formik.errors.terms && (
                    <span className="text-red-500 text-xs">{formik.errors.terms}</span>
                )}
            </div>

            <button
                type="submit"
                className="block w-full col-span-2 bg-emerald-800 text-white py-3 hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all"
            >
                Registarme
            </button>

            <div className="flex justify-center items-center col-span-2 mt-2">
                ¿Ya tienes una cuenta?
                <Link
                    href="login"
                    className="text-emerald-900 font-medium underline pl-1"
                >
                    Inicia sesión
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
