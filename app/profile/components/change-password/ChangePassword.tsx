"use client";

import { EditIcon } from "@/app/components/Icons";
import Input from "@/app/components/input/Input";
import { useUserStore } from "@/app/store/user-store/user.store";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChangePassword: FC = () => {
    const { user, updateUserPassword } = useUserStore();
    const [readOnly, setReadOnly] = useState(true);

    const handleEdit = () => {
        setReadOnly((prevValue) => !prevValue);
    };

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("El campo es requerido."),
        newPassword: Yup.string()
            .min(8, "Minimo debe tener 8 caracteres o más.")
            .required("El campo es requerido."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden.")
            .required("El campo es requerido."),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const newPassword = {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            };

            if (!user?._id) return;

            updateUserPassword(
                user?._id,
                newPassword.currentPassword,
                newPassword.newPassword,
            ).then(() => {
                setReadOnly(true);
                formik.resetForm();
            });
        },
    });

    const handleCancel = () => {
        formik.resetForm();
        setReadOnly(true);
    };

    return (
        <div>
            <div className="flex flex-nowrap justify-between">
                <h1 className="col-span-2 text-2xl font-semibold mb-3">Contraseña</h1>
                <button
                    className="mr-4 text-emerald-800 bg-zinc-300 p-2 rounded-full disabled:text-zinc-700/60 disabled:bg-slate-300/40 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 hover:shadow-md hover:shadow-zinc-500 transition-all"
                    disabled={!readOnly}
                    onClick={handleEdit}
                >
                    <EditIcon />
                </button>
            </div>

            <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
                <div>
                    <Input
                        label="Contraseña actual"
                        type="password"
                        readOnly={readOnly}
                        isInvalid={
                            formik.touched.currentPassword &&
                            !!formik.errors.currentPassword
                        }
                        messageError={formik.errors.currentPassword}
                        {...formik.getFieldProps("currentPassword")}
                    />
                </div>

                <div>
                    <Input
                        label="Contraseña nueva"
                        type="password"
                        readOnly={readOnly}
                        isInvalid={
                            formik.touched.newPassword && !!formik.errors.newPassword
                        }
                        messageError={formik.errors.newPassword}
                        {...formik.getFieldProps("newPassword")}
                    />
                </div>

                <div>
                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        readOnly={readOnly}
                        isInvalid={
                            formik.touched.confirmPassword &&
                            !!formik.errors.confirmPassword
                        }
                        messageError={formik.errors.confirmPassword}
                        {...formik.getFieldProps("confirmPassword")}
                    />
                </div>

                {!readOnly && (
                    <div className="col-span-2 flex justify-end items-center gap-3">
                        <button
                            className="bg-emerald-800 text-white px-7 py-2 flex justify-center items-center flex-nowrap gap-2 rounded-md hover:bg-emerald-900 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            type="submit"
                        >
                            Guardar
                        </button>

                        <button
                            className="grid place-content-center px-7 py-2 rounded-md outline outline-1 outline-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            type="reset"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ChangePassword;
